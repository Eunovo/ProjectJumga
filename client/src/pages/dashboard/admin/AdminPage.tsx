import React from 'react';
import { AdminNavigation, AdminNavigationItems } from '../../../components/sidebar';
import { useStyles } from '../styles';


export const AdminPage: React.FC<{ selected: AdminNavigationItems }> = ({ children, selected }) => {
    const classes = useStyles();

    return <div className={classes.dashboard}>

        <AdminNavigation
            classes={{
                sideBar: classes.sidebar,
                bottomBar: classes.bottomMenu
            }}
            selected={selected}
        />

        <div className={classes.content}>

            {children}

        </div>

    </div>
}
