import { requestPayout } from "../../services";
import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class PayoutController extends BaseController {
    public readonly baseRoute: string = '/payouts';

    constructor() {
        super();
        this.post('/', this.requestPayout);
        this.get('/', this.getMany);
    }

    /**
     * This function tries to initiate a transfer of
     * `req.body.amount` to a user's account.
     * @param req 
     * @returns
     */
    private async requestPayout(req: any) {
        await requestPayout(
            req.body.amount, { principal: req.principal });
        return { message: "queued" };
    }

    private async getMany(req: any) {
        const payouts = await services.Payout.findMany(req.query);
        return { message: "success", data: { payouts } };
    }
}
