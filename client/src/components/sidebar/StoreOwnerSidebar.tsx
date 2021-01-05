import React from 'react';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import OrdersIcon from '@material-ui/icons/ShoppingBasketOutlined';
import ProductsIcon from '@material-ui/icons/StorefrontOutlined';
import PayoutsIcon from '@material-ui/icons/MoneyOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { Nav, SideBarItem } from './Sidebar';
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

    const StoreOwnerNavs: Nav[] = [
        {
            name: 'dashboard',
            icon: <DashboardIcon className={classes.icon} />,
            route: '/dashboard/store'
        },
        {
            name: 'orders',
            icon: <OrdersIcon className={classes.icon} />,
            route: '/dashboard/orders'
        },
        {
            name: 'products',
            icon: <ProductsIcon className={classes.icon} />,
            route: '/dashboard/products'
        },
        {
            name: 'payouts',
            icon: <PayoutsIcon className={classes.icon} />,
            route: '/dashboard/payouts'
        },
        {
            name: 'settings',
            icon: <SettingsIcon className={classes.icon} />,
            route: '/dashboard/settings'
        }
    ];

    return <>
        <Hidden xsDown>
            <div className={clsx(classes.sidebar, className)}>
                {
                    StoreOwnerNavs.map((nav, i) => (
                        <SideBarItem
                            key={i}
                            name={nav.name}
                            selected={selected}
                            route={nav.route}
                        >
                            {nav.icon}
                            <Hidden smDown>
                                {nav.name}
                            </Hidden>
                        </SideBarItem>
                    ))
                }
            </div>
        </Hidden>
    </>
}
