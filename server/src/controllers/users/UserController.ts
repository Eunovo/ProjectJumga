import { approveSellerService } from "../../services/users";
import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class UserController extends BaseController {
    public readonly baseRoute: string = '/users';

    constructor() {
        super();
        this.post('/', this.create);
        this.put('/', this.update);
        this.get('/approve', this.approveSeller);
        this.post('/confirm-pay', this.confirmPay);
    }

    private async create(req: any) {
        await services.User.create(req.body);
        return { message: "success" }
    }

    private async update(req: any) {
        await services.User.updateOne(req.body, req.query);
        return { message: "success" }
    }

    private async approveSeller(req: any) {
        const paymentLink = await approveSellerService
            .approveSeller(req.principal.email);
        return { message: "success", data: { paymentLink } };
    }

    private async confirmPay(req: any) {
        const res = await approveSellerService.giveValue(
            req.query.transaction_id,
            req.body.meta.sellerId
        );

        return {
            type: 'redirect',
            url: `${process.env.APP_URL}/dashboard?success=${res}`
        };
    }
}
