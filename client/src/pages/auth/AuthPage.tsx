import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';


export const AuthPage: React.FC = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.authRoot}>

        <Box marginBottom={4}>
            <Typography align='center' variant='h4'>JUMGA</Typography>
        </Box>

        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            maxWidth='30rem'
        >
            {children}
        </Box>

    </div>
}
