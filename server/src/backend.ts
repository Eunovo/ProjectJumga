import {
    AuthorizationPlugin,
    buildMongoRepo,
    buildServices,
    CRUDPlugin,
    UsernamePasswordAuthPlugin
} from '@eunovo/superbackend';
import {
    CreatedAtPlugin
} from './plugins';

const schemaPath = `${process.cwd()}/model.graphql`;
const { repos, services } = buildServices(schemaPath, buildMongoRepo, [
    new CRUDPlugin(),
    new UsernamePasswordAuthPlugin(),
    new AuthorizationPlugin(),
    new CreatedAtPlugin()
]);

services.User.post('create', async (args: any) => {
    const { role } = args.input;
    const extension = { user: args.id, ...args.input };
    if (role === 'rider')
        await services.Rider.create(extension);
    else if (role === 'seller')
        await services.Seller
            .create({ ...extension, approved: false });
});
services.User.post('findOne', async (args: any) => {
    const { result } = args;

    let extension: any = {};
    if (result.role === 'seller') {
        extension = await services.Seller.findOne({ user: result._id });
        extension = { sellerId: extension._id, ...extension };
    } else if (result.role === 'rider') {
        extension = await services.Rider.findOne({ user: result._id });
        extension = { riderId: extension._id, ...extension };
    }

    args.result = { ...extension, ...result };
});

services.Product.pre('create', async (args: any) => {
    const { store } = args._foreign;
    args.input.accessible = store.approved;
});

services.Order.pre('create', async (args: any) => {
    const { sales } = args.input;
    const promises = sales.map(
        async (sale: any) => {
            const product = await services.Product
                .findOne({ url: sale.product });
            
            if (!product.accessible)
                throw new Error('Unauthorised');

            sale.store = product.store;
            return product;
        }
    );
    const products = await Promise.all(promises);
    const purchaseCommission = await services.Commission
        .findOne({ key: 'purchase' });
    const deliveryCommission = await services.Commission
        .findOne({ key: 'delivery' });
    
    const rider = await services.Rider.findOne({
        'address.country': args.input.deliveryAddress.country,
        'address.state': args.input.deliveryAddress.state,
        'address.city': args.input.deliveryAddress.city,
    });

    args.input.amountSold = products
        .map((p: any) => p.price);
    args.input.purchaseCommission =
        purchaseCommission.value * args.input.amountSold;
    args.input.deliveryFee = 0;
    args.input.deliveryCommission =
        deliveryCommission.value * args.input.deliveryCommission;
    args.input.path = [rider._id];
});

export { repos, services };
