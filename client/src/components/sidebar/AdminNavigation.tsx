import React from 'react';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import RidersIcon from '@material-ui/icons/DriveEtaOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { Nav, Navigation } from './Sidebar';
import { useSideBarStyles } from './styles';


export type AdminNavigationItems = 'dashboard' | 'riders' | 'settings';

interface SideBarProps {
    classes?: {
        sideBar?: string,
        bottomBar?: string
    };

    /**
     * The current selected sidebar item
     */
    selected: AdminNavigationItems;
}

export const AdminNavigation: React.FC<SideBarProps> = ({ classes, selected }) => {
    const sidebarClasses = useSideBarStyles();

    const AdminNavs: Nav[] = [
        {
            name: 'dashboard',
            icon: <DashboardIcon className={sidebarClasses.icon} />,
            route: '/dashboard/store'
        },
        {
            name: 'riders',
            icon: <RidersIcon className={sidebarClasses.icon} />,
            route: '/dashboard/riders'
        },
        {
            name: 'settings',
            icon: <SettingsIcon className={sidebarClasses.icon} />,
            route: '/dashboard/settings'
        }
    ];

    return <Navigation
        classes={classes}
        navs={AdminNavs}
        selected={selected}
    />
}
