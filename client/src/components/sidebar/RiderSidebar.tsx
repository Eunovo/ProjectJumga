import React from 'react';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import OrdersIcon from '@material-ui/icons/ShoppingBasketOutlined';
import ProductsIcon from '@material-ui/icons/StorefrontOutlined';
import PayoutsIcon from '@material-ui/icons/MoneyOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { Nav, Navigation } from './Sidebar';
import { useSideBarStyles } from './styles';


export type RiderSideBarItems = 'dashboard' | 'orders' | 'payouts' | 'settings';

interface SideBarProps {
    classes?: {
        sideBar?: string,
        bottomBar?: string
    };

    /**
     * The current selected sidebar item
     */
    selected: RiderSideBarItems;
}

export const RiderSidebar: React.FC<SideBarProps> = ({ classes, selected }) => {
    const sidebarClasses = useSideBarStyles();

    const RiderNavs: Nav[] = [
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
            name: 'payouts',
            icon: <PayoutsIcon className={sidebarClasses.icon} />,
            route: '/dashboard/payouts'
        },
        {
            name: 'settings',
            icon: <SettingsIcon className={sidebarClasses.icon} />,
            route: '/dashboard/settings'
        }
    ];

    return <Navigation
        classes={classes}
        navs={RiderNavs}
        selected={selected}
    />
}
