import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import CartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import { useCart } from '../../hooks/cart';
import { useCurrentUser } from '../../state/AppState';
import { GuestHeader, StoreOwnerHeader } from './UserHeaders';
import { useStyles } from './styles';


export const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useCurrentUser();
    const { cart } = useCart();

    const totalItemsInCart = Object.values(cart)
        .reduce((prev, cur) => prev + cur.quantity, 0);

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        className={classes.title}
                        onClick={() => history.push('/')}
                        style={{ cursor: 'pointer' }}
                        variant="h6"
                        noWrap
                    >
                        JUMGA
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />

                    <IconButton
                        aria-label='cart'
                        color='inherit'
                        onClick={() => history.push('/cart')}
                    >
                        <Badge color='secondary' badgeContent={totalItemsInCart}>
                            <CartIcon />
                        </Badge>
                    </IconButton>

                    {
                        user ? <StoreOwnerHeader /> : <GuestHeader />
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
