export abstract class BaseController {
    public abstract readonly baseRoute: string;
    private handlers: Map<string, Handler>;

    constructor() {
        this.handlers = new Map();
    }

    getHandlers() {
        return this.handlers;
    }

    post(route: string, handler: RequestHandler) {
        this.on('post', route, handler);
    }

    get(route: string, handler: RequestHandler) {
        this.on('get', route, handler);
    }

    put(route: string, handler: RequestHandler) {
        this.on('put', route, handler);
    }

    patch(route: string, handler: RequestHandler) {
        this.on('patch', route, handler);
    }

    delete(route: string, handler: RequestHandler) {
        this.on('delete', route, handler);
    }

    private on(method: HttpMethods, route: string, requestHandler: RequestHandler) {
        const handler = this.handlers.get(route) || {};
        handler[method] = requestHandler;
        this.handlers.set(`${this.baseRoute}${route}`, handler);
    }
}

type HttpMethods = "post" | "get" | "put" | "patch" | "delete";

type RequestHandler = ((req: any) => any) | ((req: any) => Promise<any>);

export interface Handler {
    post?: RequestHandler
    get?: RequestHandler
    put?: RequestHandler
    patch?: RequestHandler
    delete?: RequestHandler
}
