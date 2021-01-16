import { services } from '../../backend';
import { BaseController } from '../BaseController';

export class PaymentController extends BaseController {

    public baseRoute = '/payments';

    constructor() {
        super();

        this.get('/', this.getMany);
        this.get('/:tranxRef', this.getByTranxRef);
    }

    async getMany(req: any) {
        const payments = services.Payment.findMany(req.query);
        return { message: 'success', data: { payments } };
    }

    async getByTranxRef(req: any) {
        const payment = services.Payment
            .findOne({ transactionRef: req.params.tranxRef });
        return { message: 'success', data: payment };
    }

}
