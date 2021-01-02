import React from 'react';
import clsx from 'clsx';
import { useSideBarStyles } from './styles';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import OrdersIcon from '@material-ui/icons/ShoppingBasketOutlined';
import ProductsIcon from '@material-ui/icons/StorefrontOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';


type Items = 'dashboard' | 'orders' | 'products' | 'settings';

interface SideBarProps {
    className?: string;

    /**
     * The current selected sidebar item
     */
    selected: Items;
}

export const StoreOwnerSidebar: React.FC<SideBarProps> = ({ className, selected }) => {
    const classes = useSideBarStyles();

    return <div className={clsx(classes.sidebar, className)}>
        <SideBarItem name='dashboard' selected={selected}>
            <DashboardIcon className={classes.icon} />

            <div>Dashboard</div>
        </SideBarItem>

        <SideBarItem name='orders' selected={selected}>
            <OrdersIcon className={classes.icon} />

            <div>Orders</div>
        </SideBarItem>

        <SideBarItem name='products' selected={selected}>
            <ProductsIcon className={classes.icon} />

            <div>Products</div>
        </SideBarItem>

        <SideBarItem name='settings' selected={selected}>
            <SettingsIcon className={classes.icon} />

            <div>Settings</div>
        </SideBarItem>
    </div>
}


interface SideBarItemProps {
    name: Items;
    selected: Items;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ children, name, selected }) => {
    const classes = useSideBarStyles();

    return <div
        className={clsx(classes.sidebarItem, { [classes.selected]: name === selected })}
    >
        {children}
    </div>
}
