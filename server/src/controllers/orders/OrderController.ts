import { orderPayService } from "../../services/orders";
import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class OrderController extends BaseController {
    public readonly baseRoute: string = '/orders';

    constructor() {
        super();
        super.post('/', this.create);
        super.get('/', this.getAll);
        super.put('/', this.update);
        super.get('/pay', this.pay);
        super.post('/pay', this.createAndPay);
        super.post('/confirm-pay', this.giveValue);
    }

    private async create(req: any) {
        await services.Order.create(req.body);
        return { message: "success" };
    }

    private async getAll(req: any) {
        const orders = await services.Order.findMany(req.query);
        return { message: "success", body: { orders } };
    }

    private async update(req: any) {
        await services.Order.updateOne(req.body, req.query);
        return { message: "success" };
    }

    private async pay(req: any) {
        const paymentLink = await orderPayService
            .payOrder(req.query.id);
        return { message: "success", body: { paymentLink } };
    }

    private async createAndPay(req: any) {
        const id = await services.Order.create(req.body);
        const paymentLink = await orderPayService
            .payOrder(id);
        return { message: "success", body: { paymentLink } };
    }

    private async giveValue(req: any) {
        await orderPayService
            .giveValue(
                req.query.transaction_id,
                req.post.meta._id
            )
        return { message: "success" };
    }
}
