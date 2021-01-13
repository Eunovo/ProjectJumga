import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class ProductController extends BaseController {
    public readonly baseRoute: string = '/products';

    constructor() {
        super();
        this.post('/', this.create);
        this.get('/', this.getMany);
        this.put('/', this.update);
        this.get('/image', this.getImage);
    }

    private async create(req: any) {
        const id = await services.Product.create(req.body);

        (async () => {
            // obtain file ids for each image
            let images = [req.files.images]
                .map((file) => {
                    const id = services.File.create({ path: file.path });
                    return id;
                });
                
            images = await Promise.all(images);

            services.Product.updateOne({ images }, { _id: id });
        })()

        return { message: "success" }
    }

    private async getMany(req: any) {
        const products = await services.Product.findMany(req.query);
        return { message: "success", data: { products } };
    }

    private async update(req: any) {
        await services.Product.updateOne(req.body, req.query);
        return { message: "success" }
    }

    private async getImage(req: any) {
        const product = await services.Product.findOne(req.query);
        return { type: 'redirect', url: `/${product.images[0]}` }
    }

}
