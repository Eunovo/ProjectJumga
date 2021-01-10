import jwt from "jsonwebtoken";
import { BaseController } from "../BaseController";
import { services } from "../../backend";

export class AuthController extends BaseController {
    public baseRoute: string = '/auth';

    constructor() {
        super();
        this.post('/login', this.login);
    }

    async login(req: any) {
        const { email, password } = req.body;
        const user = await services.User.authenticate(email, password);
        const token = createToken(user);
        return {
            message: 'Authenticated',
            data: { user, token }
        };
    }

}

function createToken(user: any) {
    const { email, role } = user;
    return jwt.sign({ email, role }, process.env.JWT_SECRET);
}
