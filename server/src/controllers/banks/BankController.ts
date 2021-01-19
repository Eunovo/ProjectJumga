import { services } from "../../backend";
import { paymentService } from "../../services";
import { BaseController } from "../BaseController";

export class BankController extends BaseController {
    public baseRoute = "/banks";

    constructor() {
        super();
        this.get("/:country", this.getAll);
        this.get("/:id/branches", this.getBranches);
    }


    async getAll(req: any) {
        const country = await services.Country
            .findOne({ name: req.params.country });
        const banks = await paymentService.getBanks(country.shortCode);
        return { message: "success", data: { banks } };
    }

    async getBranches(req: any) {
        const bankId = req.params.id;
        const branches = await paymentService.getBankBranches(bankId);
        return { message: "success", data: { branches } };
    }

}
