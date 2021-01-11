import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
    AuthController,
    BaseController,
    OrderController,
    PayoutController,
    ProductController,
    UserController,
    FileController,
    Handler
} from './controllers';

const router = Router();

router.use((req: any, res, next) => {
    let auth = req.header('authorization');
    auth = auth?.trim();
    const isBearerToken = auth?.startsWith('Bearer ') ||
        auth?.startsWith('bearer ');

    if (!auth || !isBearerToken) {
        next();
        return;
    }

    const token = auth.split(' ')[1];
    const payload = jwt
        .verify(token, process.env.JWT_SECRET);
    
    req.principal = payload;
    next();
});

[
    new AuthController(),
    new OrderController(),
    new PayoutController(),
    new ProductController(),
    new UserController(),
    new FileController()
].forEach((controller) => {
    use(router, controller);
});

export { router };

function use(router: Router, controller: BaseController) {
    const handlers = controller.getHandlers();
    handlers.forEach((handler, route) => {
        Object.keys(handler)
            .forEach((method: keyof Handler) => {
                router[method](route, async (req, res) => {
                    try {
                        const response = await handler[method](req);

                        if (response.type === 'file') {
                            res.sendFile(response.path)
                        } else if (response.type === 'redirect') {
                            res.redirect(response.url);
                        } else {
                            res.status(200).json(response);
                        }
                    } catch (error) {
                        res.status(400).json({
                            message: error.message,
                            errors: error?.errors
                        });
                    }
                });
            });
    });
}
