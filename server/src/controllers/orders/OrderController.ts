import { orderPayService } from "../../services/orders";
import { services } from "../../backend";
import { BaseController } from "../BaseController";
import { updateStatus } from "../../services/orders/update_status";

export class OrderController extends BaseController {
    public readonly baseRoute: string = '/orders';

    constructor() {
        super();
        this.post('/', this.create);
        this.get('/', this.getMany);
        this.get('/store', this.getStoreOrders);
        this.get('/rider', this.getRiderOrders);
        this.put('/', this.update);
        this.get('/pay', this.pay);
        this.post('/pay', this.createAndPay);
        this.post('/confirm-pay', this.giveValue);
        this.get('/drop', this.orderDrop);
        this.get('/cancel', this.cancelOrder);
    }

    private async create(req: any) {
        await services.Order.create(req.body);
        return { message: "success" };
    }

    private async getMany(req: any) {
        const orders = await services.Order.findMany(req.query);
        return { message: "success", data: { orders } };
    }

    private async getStoreOrders(req: any) {
        const store = req.query.store;
        let orders = await services.Order
            .findMany({ 'sales.store': store });
        orders = orders.map((order: any) => {
            const sales = order.sales
                .filter((sale: any) => sale.store === store);
            return {
                ...order,
                amountSold: sales.reduce(
                    (prev: number, sale: any) => (prev + sale.amount),
                    0
                ),
                sales
            };
        });
        return { message: "success", data: { orders } };
    }

    private async getRiderOrders(req: any) {
        const rider = req.query.rider;
        let orders = await services.Order
            .findMany({ path: rider });
        orders = orders.map(
            (order: any) => ({ ...order, sales: undefined })
        );
        return { message: 'success', data: { orders } };
    }

    private async update(req: any) {
        await services.Order.updateOne(req.body, req.query);
        return { message: "success" };
    }

    private async pay(req: any) {
        const paymentLink = await orderPayService
            .payOrder(req.query.id);
        return { message: "success", data: { paymentLink } };
    }

    private async createAndPay(req: any) {
        const id = await services.Order.create(req.body);
        const paymentLink = await orderPayService
            .payOrder(id);
        return { message: "success", data: { paymentLink } };
    }

    private async giveValue(req: any) {
        const orderId = req.body.meta._id;
        const res = await orderPayService
            .giveValue(
                req.query.transaction_id,
                orderId
            );
        return {
            type: 'redirect',
            url: `${process.env.APP_URL}/purchase` +
                `?orderId=${orderId}&success=${res}`
        };
    }

    private async orderDrop(req: any) {
        const orderId = req.query.orderId;
        const userId = req.query.userId;

        const order = await services.Order.findOne({ _id: orderId });
        await updateStatus('completed', orderId);

        order.sales.forEach(async (sale: any) => {
            const sellerEarnings = sale.amount - sale.commission;
            const seller = await services.Seller
                .findOne({ storeName: sale.store });
            services.User.updateOne(
                { $inc: { earnings: sellerEarnings } },
                { _id: seller.user }
            );
        });

        const riderEarnings = order.deliveryFee - order.deliveryCommission;
        services.User.updateOne(
            { $inc: { earnings: riderEarnings } },
            { _id: userId }
        );

        return { message: 'success' };
    }

    private async cancelOrder(req: any) {
        const orderId = req.query.orderId;

        const order = await services.Order.findOne({ _id: orderId });
        await updateStatus('cancelled', orderId);

        if (order.status === 'paid') {
            // refund paid money
        }
    
        return { message: 'success' };
    }
}
