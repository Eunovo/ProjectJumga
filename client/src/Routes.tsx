import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';


export const Routes = () => (
    <>
        <Header />

        <Router>
            <Switch>
                <Route path='/' />
            </Switch>
        </Router>
    </>
);
