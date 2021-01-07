import { RiderDashboard } from "./Dashboard";
import { RiderOrders } from "./Orders";
import { RiderPayouts } from "./Payouts";
import { RiderSettings } from "./Settings";

export const RiderRoutes: any = {
    '/': <RiderDashboard />,
    '/orders': <RiderOrders />,
    '/payouts': <RiderPayouts />,
    '/settings': <RiderSettings />
}
