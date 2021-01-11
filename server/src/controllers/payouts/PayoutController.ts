import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class PayoutController extends BaseController {
    public readonly baseRoute: string = '/payouts';

    constructor() {
        super();
        this.post('/', this.triggerPayout);
        this.get('/', this.getMany);
    }

    private async triggerPayout(req: any) {
        await services.Payout.create(req.body);
        return { message: "success" }
    }

    private async getMany(req: any) {
        const payouts = await services.Payout.findMany(req.query);
        return { message: "success", data: { payouts } };
    }
}
