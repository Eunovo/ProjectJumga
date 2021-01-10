import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class FileController extends BaseController {

    public readonly baseRoute: string = "/files";

    constructor() {
        super();
        this.get("/:id", this.getFileById);
    }

    private async getFileById(req: any) {
        const fileId = req.params.id;
        let file = await services.File
            .findOne({ _id: fileId });
        return { type: 'file', path: file.path };
    }

}
 