import React from 'react';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import OrdersIcon from '@material-ui/icons/ShoppingBasketOutlined';
import ProductsIcon from '@material-ui/icons/StorefrontOutlined';
import PayoutsIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { Nav, Navigation } from './Sidebar';
import { useSideBarStyles } from './styles';


export type StoreSideBarItems = 'dashboard' | 'orders' | 'products' | 'wallet' | 'settings';

interface SideBarProps {
    classes?: {
        sideBar?: string,
        bottomBar?: string
    };

    /**
     * The current selected sidebar item
     */
    selected: StoreSideBarItems;
}

export const StoreOwnerSidebar: React.FC<SideBarProps> = ({ classes, selected }) => {
    const sidebarClasses = useSideBarStyles();

    const StoreOwnerNavs: Nav[] = [
        {
            name: 'dashboard',
            icon: <DashboardIcon className={sidebarClasses.icon} />,
            route: '/dashboard'
        },
        {
            name: 'orders',
            icon: <OrdersIcon className={sidebarClasses.icon} />,
            route: '/dashboard/orders'
        },
        {
            name: 'products',
            icon: <ProductsIcon className={sidebarClasses.icon} />,
            route: '/dashboard/products'
        },
        {
            name: 'wallet',
            icon: <PayoutsIcon className={sidebarClasses.icon} />,
            route: '/dashboard/wallet'
        },
        {
            name: 'settings',
            icon: <SettingsIcon className={sidebarClasses.icon} />,
            route: '/dashboard/settings'
        }
    ];

    return <Navigation
        classes={classes}
        navs={StoreOwnerNavs}
        selected={selected}
    />
}
