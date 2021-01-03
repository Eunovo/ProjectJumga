import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { StoreOwnerSignup } from './pages/auth';
import { StoreDashboard, StoreOrders } from './pages/dashboard';
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
                <Route path='/products/add' />
                <Route path='/products/edit/:productName' />
                <Route path='/products/:productName' />
                <Route path='/cart' />
                <Route path='/checkout' />
                <Route exact path='/' component={Home} />
                <Route path='*'>Not Found</Route>
            </Switch>
        </Router>
    </>
);
