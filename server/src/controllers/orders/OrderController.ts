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
        this.get('/tx-ref/:tranxRef', this.getByTranxRef);
        this.put('/', this.update);
        this.get('/pay', this.pay);
        this.post('/pay', this.createAndPay);
        this.get('/confirm-pay', this.giveValue);
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
        const { store, ...query } = req.query;
        let orders = await services.Order
            .findMany({ 'sales.store': store, ...query });
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
        const { rider, ...query } = req.query;
        let orders = await services.Order
            .findMany({ path: rider, ...query });
        orders = orders.map(
            (order: any) => ({ ...order, sales: undefined })
        );
        return { message: 'success', data: { orders } };
    }

    private async getByTranxRef(req: any) {
        const tranxRef = req.params.tranxRef;
        const payment = await services.Payment
            .findOne({ transactionRef: tranxRef });
        const order = await services.Order
            .findOne({ _id: payment.meta?.orderId });
        return { message: 'success', data: order };
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
        return {
            message: "success",
            data: { orderId: id,  paymentLink }
        };
    }

    private async giveValue(req: any) {
        await orderPayService
            .giveValue(
                req.query.transaction_id,
                req.query.tx_ref
            );

        return {
            type: 'redirect',
            url: `${process.env.APP_URL}/purchase` +
                `?tx_ref=${req.query.tx_ref}`
        };
    }

    private async orderDrop(req: any) {
        const code = req.query.orderCode;
        const userId = req.query.userId;

        const order = await services.Order.findOne({ code });
        await updateStatus('completed', order._id);

        order.sales.forEach(async (sale: any) => {
            const sellerEarnings = sale.amount - sale.commission;
            const seller = await services.Seller
                .findOne({ storeName: sale.store });
            services.User.updateOne(
                { $inc: { wallet: sellerEarnings } },
                { _id: seller.user }
            );
        });

        const riderEarnings = order.deliveryFee - order.deliveryCommission;
        services.User.updateOne(
            { $inc: { wallet: riderEarnings } },
            { _id: userId }
        );

        return { message: 'success' };
    }

    private async cancelOrder(req: any) {
        const orderId = req.query.orderId;

        const order = await services.Order.findOne({ _id: orderId });
        await updateStatus('cancelled', orderId);

        if (order.status === 'paid') {
            // request refund of paid money
            services.Refund.create({ order: order.code });
        }
    
        return { message: 'success' };
    }
}
