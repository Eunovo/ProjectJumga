import { services } from "../../backend"; 
import { BaseController } from "../BaseController";

export class UserController extends BaseController {
    public readonly baseRoute: string = '/users';

    constructor() {
        super();
        super.post('/', this.create);
        super.put('/', this.update);
    }

    private async create(req: any) {
        await services.User.create(req.body);
        return { message: "success" }
    }

    private async update(req: any) {
        await services.User.updateOne(req.body, req.query);
        return { message: "success" }
    }
}
