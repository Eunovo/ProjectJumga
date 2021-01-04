import React from 'react';
import {
    Box,
    useTheme
} from "@material-ui/core";


export const TabContext = React.createContext(0);

export const useTab = () => React.useContext(TabContext);


export interface TabPanelProps {
    children: React.ReactNode;
    index: any;
}

export function TabPanel(props: TabPanelProps) {
    const theme = useTheme();
    const value = React.useContext(TabContext);
    const { children, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            dir={theme.direction}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}
