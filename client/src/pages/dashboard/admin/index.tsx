import { AdminDashboard } from "./Dashboard";
import { AddRider } from "./AddRider";
import { Riders } from "./Riders";
import { AdminSettings } from "./Settings";

export const AdminRoutes: any = {
    '/': <AdminDashboard />,
    '/riders': <Riders />,
    '/riders/add': <AddRider />,
    '/settings': <AdminSettings />
}
