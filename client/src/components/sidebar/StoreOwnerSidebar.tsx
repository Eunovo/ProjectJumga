import React from 'react';
import clsx from 'clsx';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import OrdersIcon from '@material-ui/icons/ShoppingBasketOutlined';
import ProductsIcon from '@material-ui/icons/StorefrontOutlined';
import PayoutsIcon from '@material-ui/icons/MoneyOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { SideBarItem } from './Sidebar';
import { useSideBarStyles } from './styles';


export type StoreSideBarItems = 'dashboard' | 'orders' | 'products' | 'payouts' | 'settings';

interface SideBarProps {
    className?: string;

    /**
     * The current selected sidebar item
     */
    selected: StoreSideBarItems;
}

export const StoreOwnerSidebar: React.FC<SideBarProps> = ({ className, selected }) => {
    const classes = useSideBarStyles();

    return <div className={clsx(classes.sidebar, className)}>
        <SideBarItem
            name='dashboard'
            selected={selected}
            route={`/dashboard/store`}
        >
            <DashboardIcon className={classes.icon} />

            <div>Dashboard</div>
        </SideBarItem>

        <SideBarItem
            name='orders'
            selected={selected}
            route={`/dashboard/orders`}
        >
            <OrdersIcon className={classes.icon} />

            <div>Orders</div>
        </SideBarItem>

        <SideBarItem
            name='products'
            selected={selected}
            route={`/dashboard/products`}
        >
            <ProductsIcon className={classes.icon} />

            <div>Products</div>
        </SideBarItem>

        <SideBarItem
            name='payouts'
            selected={selected}
            route={`/dashboard/payouts`}
        >
            <PayoutsIcon className={classes.icon} />

            <div>Payouts</div>
        </SideBarItem>

        <SideBarItem
            name='settings'
            selected={selected}
            route={`/dashboard/settings`}
        >
            <SettingsIcon className={classes.icon} />

            <div>Settings</div>
        </SideBarItem>
    </div>
}
