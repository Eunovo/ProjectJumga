import jwt from "jsonwebtoken";
import { BaseController } from "../BaseController";
import { services } from "../../backend";

export class AuthController extends BaseController {
    public baseRoute: string = '/auth';

    constructor() {
        super();
        super.post('/login', this.login);
    }

    async login(req: any) {
        const { email, password } = req.body;
        const user = await services.User.authenticate(email, password);
        const token = this.createToken(user);
        return {
            message: 'Authenticated',
            body: { user, token }
        };
    }

    private createToken(user: any) {
        const { email, role } = user;
        return jwt.sign({ email, role }, process.env.JWT_SECRET);
    }

}
