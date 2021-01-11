import { services } from "../../backend";
import { paymentService } from "../payment";
import { updateStatus } from "./update_status";

export class OrderPayService {

    async payOrder(orderId: string) {
        const order = await services.Order
            .findOne({ _id: orderId });

        if (order.status !== 'pending')
            throw new Error('Illegal Operation');
        
        return paymentService.getPaymentLink({
            amount: order.amountSold,
            redirectUrl: `${process.env.URL}/orders/confirm-pay`,
            customer: order.customer,
            meta: { _id: order._id }
        });
    }

    async giveValue(tranxId: string, orderId: string) {
        const isVerified = await paymentService.verify(tranxId, 100);
        if (!isVerified)
            return false;

        updateStatus("paid", orderId);
        return true;
    }

}
