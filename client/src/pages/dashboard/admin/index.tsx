import { AdminDashboard } from "./Dashboard";
import { AddRider } from "./AddRider";
import { Riders } from "./Riders";
import { Refunds } from "./Refunds";
import { AdminSettings } from "./Settings";

export const AdminRoutes: any = {
    '/': <AdminDashboard />,
    '/riders': <Riders />,
    '/riders/add': <AddRider />,
    '/refunds': <Refunds />,
    '/settings': <AdminSettings />
}
