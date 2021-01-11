import { repos, services } from "../../backend";
import { paymentService } from "../payment";

export class ApproveSellerService {

    async approveSeller(sellerEmail: string) {
        const user = await services.User
            .findOne({ email: sellerEmail });

        if (user.role !== 'seller')
            throw new Error('Illegal Operation');

        const seller = await services.Seller
            .findOne({ user: user._id });

        if (seller.approved)
            throw new Error('Illegal Operation');

        const amount = (await services.Commission
            .findOne({ key: 'storeapproval' })).value;

        return paymentService.getPaymentLink({
            amount,
            redirectUrl: `${process.env.URL}/users/confirm-pay`,
            customer: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email
            },
            meta: {
                storeName: seller.storeName
            }
        });
    }

    async giveValue(tranxId: string, storeName: string) {
        const amount = (await services.Commission
            .findOne({ key: 'storeapproval' })).value;

        const isVerified = await paymentService.verify(tranxId, amount);
        if (!isVerified)
            return false;

        
        repos.Seller.updateOne(
            { storeName }, { approved: true });
        repos.Product.updateMany(
            { store: storeName }, { accessible: true }
        );
        return true;
    }

}
