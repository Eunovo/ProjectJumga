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
            amount: order.total + order.deliveryFee,
            redirectUrl: `${process.env.URL}/orders/confirm-pay`,
            customer: order.customer,
            meta: { orderId: order._id.toString() },
            narration: "Order payment"
        });
    }

    /**
     * Tries to verify payment for an order
     * and update the order status
     * @param tranxId 
     * @param tranxRef 
     * @returns `null` if the payment could not be verified
     * or the paid order id the payment was successfully verified
     */
    async giveValue(tranxId: string, tranxRef: string) {
        const payment = await paymentService.verify(
            tranxId, tranxRef);
        if (!payment)
            return null;

        const { orderId } = payment.meta;
        const order = await services.Order.findOne({ _id: orderId });

        updateStatus("paid", orderId);
        return order;
    }

}
