import {
    AuthorizationPlugin,
    buildMongoRepo,
    buildServices,
    CRUDPlugin,
    RelationshipPlugin,
    UsernamePasswordAuthPlugin
} from '@eunovo/superbackend';
import {
    CreatedAtPlugin
} from './plugins';
import { getNearestRider, getUserExtension } from './services/users';
import { generateUniqueRandomString } from './utils';

const schemaPath = `${process.cwd()}/model.graphql`;
const { repos, services } = buildServices(schemaPath, buildMongoRepo, [
    new CRUDPlugin(),
    new RelationshipPlugin(),
    new UsernamePasswordAuthPlugin(),
    new AuthorizationPlugin(),
    new CreatedAtPlugin()
]);

services.User.post('create', async (args: any) => {
    const { role, storeName } = args.input;
    const userId = args.id;
    try {
        if (role === 'rider')
            await services.Rider.create({ user: userId });
        else if (role === 'seller')
            await services.Seller
                .create({ user: userId, storeName, approved: false });
    } catch (error) {
        await services.User.removeOne({ _id: args.id });
        throw error;
    }
});

services.User.post('findOne', async (args: any) => {
    const { result } = args;
    const extension = await getUserExtension(result);
    args.result = { ...extension, ...result };
});

services.User.post('authenticate', async (args: any) => {
    const { user } = args;
    const extension = await getUserExtension(user);
    args.user = { ...extension, ...user };
});

services.Product.pre('create', async (args: any) => {
    const { store } = args._foreign;
    args.input.accessible = store.approved;
});

services.Order.pre('create', async (args: any) => {
    const { sales } = args.input;

    const purchaseCommission = await services.Commission
        .findOne({ key: 'purchase' });
    const deliveryCommission = await services.Commission
        .findOne({ key: 'delivery' });

    const promises = sales.map(
        async (sale: any) => {
            const product = await services.Product
                .findOne({ url: sale.product });

            if (!product.accessible)
                throw new Error('Unauthorised');

            sale.store = product.store;
            sale.amount = product.price * sale.quantity;
            sale.commission = purchaseCommission.value * sale.amount;
            return sale.amount;
        }
    );
    const saleTotals = await Promise.all(promises);

    const rider = await getNearestRider(args.input.deliveryAddress);

    const prefix = generateUniqueRandomString();
    args.input.code = `order-${prefix}`;
    args.input.total = saleTotals.reduce(
        (prev: number, cur: number) => prev + cur, 0);
    args.input.deliveryFee = 0;
    args.input.deliveryCommission =
        deliveryCommission.value * args.input.deliveryCommission;
    args.input.path = [rider.user];
});

export { repos, services };
