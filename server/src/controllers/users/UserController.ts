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
}
