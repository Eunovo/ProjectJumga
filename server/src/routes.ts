import { Router } from 'express';
import {
    AuthController,
    BaseController,
    Handler
} from './controllers';

const router = Router();

use(router, new AuthController());

export { router };

function use(router: Router, controller: BaseController) {
    const handlers = controller.getHandlers();
    handlers.forEach((handler, route) => {
        Object.keys(handler)
            .forEach((method: keyof Handler) => {
                router[method](route, async (req, res, next) => {
                    try {
                        const response = await handler[method](req);
                        res.status(200).json(response);
                    } catch (error) {
                        next(error);
                    }
                });
            });
    });
}
