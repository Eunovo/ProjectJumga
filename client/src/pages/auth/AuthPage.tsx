import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';


export const AuthPage: React.FC = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.authRoot}>

        <Typography variant='h4'>JUMGA</Typography>

        {children}

    </div>
}
