import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { Login, StoreOwnerSignup } from './pages/auth';
import { Cart } from './pages/cart';
import { Checkout } from './pages/checkout';
import {
    StoreRoutes,
    RiderRoutes
} from './pages/dashboard';
import { Home } from './pages/home/Home';
import { useCurrentUser } from './state/AppState';


export const Routes = () => {
    const { user, ready } = useCurrentUser();

    const routes: any = {
        'seller': StoreRoutes,
        'rider': RiderRoutes
    }

    return <>
        {/* TODO decide what routes to render if user is logged in */}
        <Router>
            <Switch>
                <Route path='/login/store'><Login userType='seller' /></Route>
                <Route path='/login/rider'><Login userType='rider' /></Route>
                <Route path='/login/admin'><Login userType='admin' /></Route>
                <Route path='/signup/store' component={StoreOwnerSignup} />

                <Route path='/dashboard'>
                    <Header />
                    {
                        ready && user && <DashboardRoutes routes={routes[user.role]} />
                    }
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
};

const DashboardRoutes: React.FC<{ routes: any }> = ({ routes }) => (
    <Switch>
        {
            Object.keys(routes)
                .map((key, i) => (
                    <Route
                        key={i}
                        path={`/dashboard${key}`}
                    >
                        {routes[key]}
                    </Route>
                ))
        }
    </Switch>
);
