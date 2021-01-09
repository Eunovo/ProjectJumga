import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class ProductController extends BaseController {
    public readonly baseRoute: string = '/products';

    constructor() {
        super();
        super.post('/', this.create);
        super.get('/', this.getAll);
        super.put('/', this.update);
    }

    private async create(req: any) {
        await services.Product.create(req.body);
        return { message: "success" }
    }

    private async getAll(req: any) {
        const products = await services.Product.findMany(req.query);
        return { message: "success", body: { products } };
    }

    private async update(req: any) {
        await services.Product.updateOne(req.body, req.query);
        return { message: "success" }
    }
}
