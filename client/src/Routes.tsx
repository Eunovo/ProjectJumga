import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { StoreDashboard } from './pages/dashboard';
import { Home } from './pages/home/Home';


export const Routes = () => (
    <>
        <Header />

        <Router>
            <Switch>
                <Route path='/login/store' />
                <Route path='/login/rider' />
                <Route path='/signup/store' />
                <Route path='/signup/rider' />
                <Route path='/dashboard/store' component={StoreDashboard} />
                <Route path='/products/add' />
                <Route path='/products/edit/:productName' />
                <Route path='/products/:productName' />
                <Route path='/cart' />
                <Route path='/checkout' />
                <Route path='/' component={Home} />
            </Switch>
        </Router>
    </>
);
