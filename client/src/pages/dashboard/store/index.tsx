import { StoreDashboard } from './Dashboard';
import { StoreOrders } from './Orders';
import { StoreAddProduct } from './AddProduct';
import { StoreProducts } from './Products';
import { StorePayouts } from './Payouts';
import { StoreSettings } from './Settings';


export const StoreRoutes: any = {
    '/': <StoreDashboard />,
    '/orders': <StoreOrders />,
    '/products/add': <StoreAddProduct />,
    '/products': <StoreProducts />,
    '/payouts': <StorePayouts />,
    '/settings': <StoreSettings />
}
