import { repos, services } from "../../backend";
import { paymentService } from "../payment";

export class ApproveSellerService {

    async approveSeller(sellerEmail: string) {
        const user = await services.User
            .findOne({ email: sellerEmail });

        if (user.role !== 'seller')
            throw new Error('Illegal Operation');

        if (user.seller.approved)
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
                storeName: user.seller.storeName
            },
            narration: "One-time Store Approval fee"
        });
    }

    /**
     * Tries to verify the payment of the store one-time approval fee
     * and approve the store
     * @param tranxId 
     * @param tranxRef 
     * @returns `true` if the store has been approved or
     * `false` if the payment could not be verified
     */
    async giveValue(tranxId: string, tranxRef: string) {
        const payment = await paymentService.verify(tranxId, tranxRef);
        if (!payment)
            return false;

        const { storeName } = payment.meta;
        repos.Seller.updateOne(
            { storeName }, { approved: true });
        repos.Product.updateMany(
            { store: storeName }, { accessible: true }
        );
        return true;
    }

}
