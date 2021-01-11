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

        return paymentService.getPaymentLink({
            amount: 20,
            redirectUrl: `${process.env.URL}/users/confirm-pay`,
            customer: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email
            },
            meta: {
                sellerId: seller._id
            }
        });
    }

    async giveValue(tranxId: string, sellerId: string) {
        const isVerified = await paymentService.verify(tranxId, 20);
        if (!isVerified)
            return false;

        repos.Seller.updateOne(
            { _id: sellerId }, { approved: true });
        return true;
    }

}
