import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { CustomerSignup, Login, Logout, StoreOwnerSignup } from './pages/auth';
import { Cart } from './pages/cart';
import { Checkout } from './pages/checkout';
import {
    StoreRoutes,
    RiderRoutes,
    AdminRoutes
} from './pages/dashboard';
import { Home } from './pages/home/Home';
import { Purchase } from './pages/purchase';
import { Purchases } from './pages/purchases';
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
                <Route path='/login' exact><Login userType='user' /></Route>
                <Route path='/login/store'><Login userType='seller' /></Route>
                <Route path='/login/rider'><Login userType='rider' /></Route>
                <Route path='/login/admin'><Login userType='admin' /></Route>
                <Route path='/signup' component={CustomerSignup} exact />
                <Route path='/signup/store' component={StoreOwnerSignup} />
                <Route path='/logout' exact component={Logout} />

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
                        <AuthRoute path='/checkout' component={Checkout} />
                        <AuthRoute path='/purchase' component={Purchase} />
                        <AuthRoute path='/purchases' component={Purchases} />
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

const AuthRoute: React.FC<RouteProps> = (props) => {
    const { user, ready } = useCurrentUser();
    if (!ready) return <></>;
    if (!user) return <Redirect to={`/login?from=${props.path}`} />;

    return <Route {...props} />;
}
