import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { StoreOwnerSignup } from './pages/auth';
import { Cart } from './pages/cart';
import { Checkout } from './pages/checkout';
import {
    StoreDashboard,
    StoreOrders,
    StoreProducts,
    StorePayouts,
    StoreSettings,
    StoreAddProduct
} from './pages/dashboard';
import { Home } from './pages/home/Home';


export const Routes = () => (
    <>
        <Router>
            <Switch>
                <Route path='/login/store' />
                <Route path='/login/rider' />
                <Route path='/signup/store' component={StoreOwnerSignup} />
                <Route path='/signup/rider' />

            </Switch>
            
            <Header />

            {/* TODO decide what routes to render if user is logged in */}

            <Switch>
                <Route path='/dashboard/store' component={StoreDashboard} />
                <Route path='/dashboard/orders' component={StoreOrders} />
                <Route path='/dashboard/products/add' component={StoreAddProduct} />
                <Route path='/dashboard/products/edit/:productName' />
                <Route path='/dashboard/products' component={StoreProducts} />
                <Route path='/dashboard/payouts' component={StorePayouts} />
                <Route path='/dashboard/settings' component={StoreSettings} />
                <Route path='/cart' component={Cart} />
                <Route path='/checkout' component={Checkout} />
                <Route exact path='/' component={Home} />
                <Route path='*'>Not Found</Route>
            </Switch>
        </Router>
    </>
);
