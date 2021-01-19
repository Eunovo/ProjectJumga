import React from 'react';
import {
    Button,
    Menu,
    MenuItem,
    IconButton,
    Badge,
    withStyles
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useStyles } from './styles';

const StyledMenuItem = withStyles({
    root: {
        minWidth: '7rem'
    }
})(MenuItem);

export const GuestHeader = () => {
    const classes = useStyles();
    const history = useHistory();

    const [route, setRoute] = React.useState<"login" | "signup">("login");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMenuOpen = (route: "login" | "signup") =>
        (event: React.MouseEvent<HTMLElement>) => {
            setRoute(route);
            setAnchorEl(event.currentTarget);
        };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <StyledMenuItem onClick={() => {
                history.push(`/${route}`);
                handleMenuClose();
            }}>
                User
            </StyledMenuItem>

            <StyledMenuItem onClick={() => {
                history.push(`/${route}/store`);
                handleMenuClose();
            }}>
                Seller
            </StyledMenuItem>
            {
                route === 'login' && (
                    <StyledMenuItem onClick={() => {
                        history.push(`/${route}/rider`);
                        handleMenuClose();
                    }}>
                        Rider
                    </StyledMenuItem>
                )
            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <StyledMenuItem onClick={handleMenuOpen('login')}>
                <p>Login</p>
            </StyledMenuItem>
            <StyledMenuItem onClick={handleMenuOpen('signup')}>
                <p>Signup</p>
            </StyledMenuItem>
        </Menu>
    );

    return <>
        <div className={classes.sectionDesktop}>
            <Button
                aria-label="signup"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen('login')}
                color="inherit"
            >
                Login
            </Button>

            <Button
                aria-label="signup"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen('signup')}
                color="inherit"
            >
                Signup
            </Button>
        </div>
        <div className={classes.sectionMobile}>
            <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <MoreIcon />
            </IconButton>
        </div>
        {renderMobileMenu}
        {renderMenu}
    </>;
}

export const StoreOwnerHeader = () => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';

    return <>

        <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
            </Badge>
        </IconButton>

        <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>

        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <StyledMenuItem onClick={() => {
                handleMenuClose();
            }}>
                Profile
            </StyledMenuItem>

            <StyledMenuItem onClick={() => {
                history.push(`/purchases`);
                handleMenuClose();
            }}>
                Purchases
            </StyledMenuItem>

            <StyledMenuItem onClick={() => {
                history.push(`/logout`);
                handleMenuClose();
            }}>
                Logout
            </StyledMenuItem>
        </Menu>

    </>;
}
