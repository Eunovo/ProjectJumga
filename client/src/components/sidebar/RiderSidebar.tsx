import React from 'react';
import clsx from 'clsx';
import { useSideBarStyles } from './styles';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import OrdersIcon from '@material-ui/icons/ShoppingBasketOutlined';
import ProductsIcon from '@material-ui/icons/StorefrontOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { SideBarItem } from './Sidebar';


export type RiderSideBarItems = 'dashboard' | 'orders' | 'products' | 'settings';

interface SideBarProps {
    className?: string;

    /**
     * The current selected sidebar item
     */
    selected: RiderSideBarItems;
}

export const RiderSidebar: React.FC<SideBarProps> = ({ className, selected }) => {
    const classes = useSideBarStyles();

    return <div className={clsx(classes.sidebar, className)}>
        <SideBarItem
            name='dashboard'
            selected={selected}
            route={``}
        >
            <DashboardIcon className={classes.icon} />

            <div>Dashboard</div>
        </SideBarItem>

        <SideBarItem
            name='orders'
            selected={selected}
            route={``}
        >
            <OrdersIcon className={classes.icon} />

            <div>Orders</div>
        </SideBarItem>

        <SideBarItem
            name='products'
            selected={selected}
            route={``}
        >
            <ProductsIcon className={classes.icon} />

            <div>Products</div>
        </SideBarItem>

        <SideBarItem
            name='settings'
            selected={selected}
            route={``}
        >
            <SettingsIcon className={classes.icon} />

            <div>Settings</div>
        </SideBarItem>
    </div>
}

