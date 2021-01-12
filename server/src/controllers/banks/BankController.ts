import { paymentService } from "../../services";
import { BaseController } from "../BaseController";

export class BankController extends BaseController {
    public baseRoute = "/banks";

    constructor() {
        super();
        this.get("/", this.getAll);
    }


    async getAll() {
        const banks = await paymentService.getBanks();
        return { message: "success", data: { banks } };
    }

}
