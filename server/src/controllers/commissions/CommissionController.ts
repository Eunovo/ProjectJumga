import { services } from "../../backend";
import { BaseController } from "../BaseController"

export class CommissionController extends BaseController {
    public readonly baseRoute: string = '/commissions';

    constructor() {
        super();
        this.get('/', this.getMany);
        this.put('/', this.updateCommissions);
    }

    async getMany(req: any) {
        const commissions = await services.Commission
            .findMany(req.query);

        return {
            message: 'success',
            data: { commissions }
        }
    }

    async updateCommissions(req: any) {
        await services.Commission
            .updateMany(req.body, {});
        return { messsage: 'success' };
    }

}
