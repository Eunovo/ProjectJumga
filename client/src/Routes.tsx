import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { StoreOwnerSignup } from './pages/auth';
import {
    StoreDashboard,
    StoreOrders,
    StoreProducts,
    StorePayouts,
    StoreSettings
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

            <Switch>
                <Route path='/dashboard/store' component={StoreDashboard} />
                <Route path='/dashboard/orders' component={StoreOrders} />
                <Route path='/dashboard/products/add' />
                <Route path='/dashboard/products/edit/:productName' />
                <Route path='/dashboard/products' component={StoreProducts} />
                <Route path='/dashboard/payouts' component={StorePayouts} />
                <Route path='/dashboard/settings' component={StoreSettings} />
                <Route path='/cart' />
                <Route path='/checkout' />
                <Route exact path='/' component={Home} />
                <Route path='*'>Not Found</Route>
            </Switch>
        </Router>
    </>
);
