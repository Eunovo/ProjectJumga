import { paymentService } from "../..//services";
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
        const users = await services.User
            .findMany({
                $or: [{ role: 'seller' }, { role: 'rider' }]
            });
        
        const accounts = users.map((user: any) => ({
            ...user.account,
            amount: user.earnings
        }));

        await paymentService.payout(accounts);

        const ids = users.map((user: any) => user._id);
        // Can I subtract the earnings instead of setting to zero?
        services.User.updateMany(
            { earnings: 0 }, { _id: { $in: ids } });

        return { message: "queued" }
    }

    private async getMany(req: any) {
        const payouts = await services.Payout.findMany(req.query);
        return { message: "success", data: { payouts } };
    }
}
