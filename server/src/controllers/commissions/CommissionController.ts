import { services } from "../../backend";
import { BaseController } from "../BaseController"

export class CommissionController extends BaseController {
    public readonly baseRoute: string = '/commissions';

    constructor() {
        super();
        this.get('/', this.getMany);
    }

    async getMany(req: any) {
        const commissions = await services.Commission
            .findMany(req.query);

        return {
            message: 'success',
            data: { commissions }
        }
    }
}
