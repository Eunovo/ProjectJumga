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
        const order = await services.Order.findOne(req.query);
        return { message: "success", body: { paymentLink: '' } };
    }
}
