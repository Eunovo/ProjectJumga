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
        const id = await services.User.create(req.body);
        const { role } = req.body;
        const extension = { user: id, ...req.body };
        if (role === 'rider')
            await services.Rider.create(extension);
        else if (role === 'seller')
            await services.Seller
                .create({ ...extension, approved: false });

        return { message: "success" }
    }

    // TODO update seller or rider too
    private async update(req: any) {
        await services.User.updateOne(req.body, req.query);
        return { message: "success" }
    }

    private async approveSeller(req: any) {
        const paymentLink = await approveSellerService
            .approveSeller(req.principal.email);
        return { message: "success", body: { paymentLink } };
    }

    private async confirmPay(req: any) {
        await approveSellerService.giveValue(
            req.query.transaction_id,
            req.body.meta.sellerId
        );

        return { message: "success" };
    }
}
