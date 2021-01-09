import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class PayoutController extends BaseController {
    public readonly baseRoute: string = '/payouts';

    constructor() {
        super();
        super.post('/', this.triggerPayout);
        super.get('/', this.getAll);
    }

    private async triggerPayout(req: any) {
        await services.Payout.create(req.body);
        return { message: "success" }
    }

    private async getAll(req: any) {
        const payouts = await services.Payout.findMany(req.query);
        return { message: "success", body: { payouts } };
    }
}
