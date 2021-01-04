import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
    Paper,
    Tabs,
    Tab,
    Typography,
    useTheme
} from "@material-ui/core";
import { useStyles } from "../styles";
import { TabContext } from './common';


interface SettingsProps {
    tabs: string[]
}

export const Settings: React.FC<SettingsProps> = ({ children, tabs }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return <>

        <Typography className={classes.header} variant='h4'>
            Settings
        </Typography>

        <Paper elevation={1}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {tabs.map((tab, index) => <Tab key={index} label={tab} />)}
            </Tabs>
        </Paper>

        <TabContext.Provider value={value}>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {children}
            </SwipeableViews>
        </TabContext.Provider>

    </>;
}
