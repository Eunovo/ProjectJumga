import React from 'react';
import { StoreOwnerSidebar, StoreSideBarItems } from '../../../components/sidebar';
import { useStyles } from '../styles';


export const StorePage: React.FC<{ selected: StoreSideBarItems }> = ({ children, selected }) => {
    const classes = useStyles();

    return <div className={classes.dashboard}>

        <StoreOwnerSidebar
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
