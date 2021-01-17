import { services } from "../../backend";
import { BaseController } from "../BaseController";


export class RefundController extends BaseController {
    
    public baseRoute = '/refunds';

    constructor() {
        super();
        this.get('/', this.getMany);
    }

    private async getMany(req: any) {
        const refunds = await services.Refund.findMany(req.query);
        return { message: 'success', data: { refunds } };
    }

}
