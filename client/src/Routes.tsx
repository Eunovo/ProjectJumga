import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { Login, StoreOwnerSignup } from './pages/auth';
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
        {/* TODO decide what routes to render if user is logged in */}
        <Router>
            <Switch>
                <Route path='/login/store'><Login userType='seller' /></Route>
                <Route path='/login/rider'><Login userType='rider' /></Route>
                <Route path='/login/admin'><Login userType='admin' /></Route>
                <Route path='/signup/store' component={StoreOwnerSignup} />

                <Route path='/dashboard'>
                    <Header />
                    <Switch>
                        <Route path='/dashboard/store' component={StoreDashboard} />
                        <Route path='/dashboard/orders' component={StoreOrders} />
                        <Route path='/dashboard/products/add' component={StoreAddProduct} />
                        <Route path='/dashboard/products/edit/:productName' />
                        <Route path='/dashboard/products' component={StoreProducts} />
                        <Route path='/dashboard/payouts' component={StorePayouts} />
                        <Route path='/dashboard/settings' component={StoreSettings} />
                    </Switch>
                </Route>

                <Route path='/'>
                    <Header />
                    <Switch>
                        <Route path='/cart' component={Cart} />
                        <Route path='/checkout' component={Checkout} />
                        <Route exact path='/' component={Home} />
                        <Route path='*'>Not Found</Route>
                    </Switch>
                </Route>
            </Switch>
        </Router>
    </>
);
