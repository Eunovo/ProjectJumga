import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { CustomerSignup, Login, StoreOwnerSignup } from './pages/auth';
import { Cart } from './pages/cart';
import { Checkout } from './pages/checkout';
import {
    StoreRoutes,
    RiderRoutes,
    AdminRoutes
} from './pages/dashboard';
import { Home } from './pages/home/Home';
import { Purchase } from './pages/purchase';
import { useCurrentUser } from './state/AppState';


export const Routes = () => {
    const { user, ready } = useCurrentUser();

    const routes: any = {
        'seller': StoreRoutes,
        'rider': RiderRoutes,
        'admin': AdminRoutes
    }

    return <>
        <Router>
            <Switch>
                <Route path='/login'><Login userType='user' /></Route>
                <Route path='/login/store'><Login userType='seller' /></Route>
                <Route path='/login/rider'><Login userType='rider' /></Route>
                <Route path='/login/admin'><Login userType='admin' /></Route>
                <Route path='/signup' component={CustomerSignup} />
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
                        <Route path='/purchase' component={Purchase} />
                        <Route exact path='/' component={Home} />
                        <Route path='*'>Not Found</Route>
                    </Switch>
                </Route>
            </Switch>
        </Router>
    </>
};

const DashboardRoutes: React.FC<{ routes?: any }> = ({ routes }) => (
    routes ?
        <Switch>
            {
                Object.keys(routes)
                    .map((key, i) => (
                        <Route
                            key={i}
                            path={`/dashboard${key}`}
                            exact
                        >
                            {routes[key]}
                        </Route>
                    ))
            }
        </Switch>
        : <Redirect to="/" />
);
