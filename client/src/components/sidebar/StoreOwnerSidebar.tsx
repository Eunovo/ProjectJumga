import React from 'react';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import OrdersIcon from '@material-ui/icons/ShoppingBasketOutlined';
import ProductsIcon from '@material-ui/icons/StorefrontOutlined';
import PayoutsIcon from '@material-ui/icons/MoneyOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { BottomMenu } from './BottomMenu';
import { Nav, SideBarItem } from './Sidebar';
import { useSideBarStyles } from './styles';


export type StoreSideBarItems = 'dashboard' | 'orders' | 'products' | 'payouts' | 'settings';

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
            route: '/dashboard/store'
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

    return <>
        <Hidden xsDown>
            <div className={clsx(classes?.sideBar, sidebarClasses.sidebar)}>
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

        <Hidden smUp>
            <BottomMenu className={classes?.bottomBar} navs={StoreOwnerNavs}/>
        </Hidden>
    </>
}
