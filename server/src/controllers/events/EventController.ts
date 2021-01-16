import { handleTransferEvent } from "../../services";
import { BaseController } from "../BaseController";

export class EventController extends BaseController {

    public baseRoute = '/events';

    constructor() {
        super();
        this.post('/', this.handleEvent);
    }


    private async handleEvent(req: any) {
        if (req.headers['verif-hash'] !== process.env.FLUTTERWAVE_HASH)
            return { message: 'error' };

        const { event, data } = req.body;
        const eventType = event?.split('.')?.[0]?.toLowerCase();

        console.info(`Event: ${event}, Status: ${data?.status}`);

        if (eventType === 'transfer') {
            handleTransferEvent(data);
        }

        return { message: 'success' };
    }

}
