import { services } from "src/backend";
import { paymentService } from "../../services";
import { BaseController } from "../BaseController";

export class BankController extends BaseController {
    public baseRoute = "/banks";

    constructor() {
        super();
        this.get("/:country", this.getAll);
    }


    async getAll(req: any) {
        const country = await services.Country
            .findOne({ name: req.params.country });
        const banks = await paymentService.getBanks(country.shortCode);
        return { message: "success", data: { banks } };
    }

}
