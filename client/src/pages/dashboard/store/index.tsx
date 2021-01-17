import { StoreDashboard } from './Dashboard';
import { StoreOrders } from './Orders';
import { StoreAddProduct } from './AddProduct';
import { StoreProducts } from './Products';
import { StoreWallet } from './Wallet';
import { StoreSettings } from './Settings';


export const StoreRoutes: any = {
    '/': <StoreDashboard />,
    '/orders': <StoreOrders />,
    '/products/add': <StoreAddProduct />,
    '/products': <StoreProducts />,
    '/wallet': <StoreWallet />,
    '/settings': <StoreSettings />
}
