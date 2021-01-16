import { paymentService } from "../../services";
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
        if (req.principal?.role !== 'admin')
            throw new Error('Unauthorised');

        let users = await services.User
            .findMany({
                $or: [{ role: 'seller' }, { role: 'rider' }]
            });

        users = users.filter((user: any) => (
            user.account?.name && user.account?.number
            && user.account?.bankCode && user.earnings > 0
        ));

        const accounts = users.map((user: any) => ({
            ...user.account,
            amount: user.earnings
        }));

        await paymentService.payout(accounts);

        const ids = users.map((user: any) => user._id);
        services.User.updateMany(
            { $inc: { earnings: -users.earnings } },
            { _id: { $in: ids } }
        );

        return { message: "queued" };
    }

    private async getMany(req: any) {
        const payouts = await services.Payout.findMany(req.query);
        return { message: "success", data: { payouts } };
    }
}
