import { RiderDashboard } from "./Dashboard";
import { Order } from "./Order";
import { RiderOrders } from "./Orders";
import { RiderWallet } from "./Wallet";
import { RiderSettings } from "./Settings";

export const RiderRoutes: any = {
    '/': <RiderDashboard />,
    '/orders': <RiderOrders />,
    '/order/:orderId': <Order />,
    '/wallet': <RiderWallet />,
    '/settings': <RiderSettings />
}
