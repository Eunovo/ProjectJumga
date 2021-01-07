import React from 'react';
import { RiderSidebar, RiderSideBarItems } from '../../../components/sidebar';
import { useStyles } from '../styles';


export const RiderPage: React.FC<{ selected: RiderSideBarItems }> = ({ children, selected }) => {
    const classes = useStyles();

    return <div className={classes.dashboard}>

        <RiderSidebar
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
