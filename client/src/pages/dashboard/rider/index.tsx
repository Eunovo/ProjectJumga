import { RiderDashboard } from "./Dashboard";
import { Order } from "./Order";
import { RiderOrders } from "./Orders";
import { RiderPayouts } from "./Payouts";
import { RiderSettings } from "./Settings";

export const RiderRoutes: any = {
    '/': <RiderDashboard />,
    '/orders': <RiderOrders />,
    '/order/:orderId': <Order />,
    '/payouts': <RiderPayouts />,
    '/settings': <RiderSettings />
}
