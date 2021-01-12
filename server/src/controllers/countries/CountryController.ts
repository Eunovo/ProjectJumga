import { services } from "../../backend";
import { BaseController } from "../BaseController";

export class CountryController extends BaseController {
    public baseRoute = "/countries";

    constructor() {
        super();
        this.get("/", this.getAll);
    }

    private async getAll() {
        const countries = await services.Country.findMany({});
        return { message: "success", data: { countries } }; 
    }

}
