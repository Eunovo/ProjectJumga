import { orderPayService } from "../../services/orders";
import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class OrderController extends BaseController {
    public readonly baseRoute: string = '/orders';

    constructor() {
        super();
        this.post('/', this.create);
        this.get('/', this.getMany);
        this.get('/:store', this.getStoreOrders);
        this.put('/', this.update);
        this.get('/pay', this.pay);
        this.post('/pay', this.createAndPay);
        this.post('/confirm-pay', this.giveValue);
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
        const store = req.params.store;
        let orders = await services.Order
            .findMany({ 'sales.store': store });
        orders = orders.map((order: any) => {
            return {
                ...order,
                sales: order.sales
                    .filter((sale: any) => sale.store === store)
            };
        });
        return { message: "success", data: { orders } };
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
}
