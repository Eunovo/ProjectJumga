import { services } from "../../backend";
import { BaseController } from "../BaseController";


export class RefundController extends BaseController {
    
    public baseRoute = '/refunds';

    constructor() {
        super();
        this.get('/', this.getMany);
        this.get('/:id/accept', this.acceptRefund);
        this.get('/:id/decline', this.declineRefund);
    }

    private async getMany(req: any) {
        const refunds = await services.Refund.findMany(req.query);
        return { message: 'success', data: { refunds } };
    }

    private async acceptRefund(req: any) {
        await services.Refund.updateOne(
            { status: 'accepted' }, { _id: req.params.id });
        return { message: 'success' };
    }

    private async declineRefund(req: any) {
        await services.Refund.updateOne(
            { status: 'declined' }, { _id: req.params.id });
        return { message: 'success' };
    }

}
