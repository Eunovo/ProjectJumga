import { repos, services } from "../../backend";
import { paymentService } from "../payment";

export class ApproveSellerService {

    async approveSeller(sellerEmail: string) {
        const user = await services.User
            .findOne({ email: sellerEmail });

        // TODO fail is user is not seller

        const seller = await services.Seller
            .findOne({ user: user._id });
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
            throw new Error('Operation Failed!');

        return repos.Seller.updateOne(
            { _id: sellerId }, { approved: true });
    }

}
