import React from 'react';
import { StoreOwnerSidebar, StoreSideBarItems } from '../../../components/sidebar';
import { useStyles } from '../styles';


export const StorePage: React.FC<{ selected: StoreSideBarItems }> = ({ children, selected }) => {
    const classes = useStyles();

    return <div className={classes.dashboard}>

        <StoreOwnerSidebar className={classes.sidebar} selected={selected} />

        <div className={classes.content}>

            {children}

        </div>

    </div>
}
