import clsx from "clsx";
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import { useSideBarStyles } from "./styles";


export interface Nav {
    icon: React.ReactNode,
    name: string,
    route: string
}


interface SideBarItemProps {
    name: string;
    selected: string;
    route: string;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ children, name, selected, route }) => {
    const classes = useSideBarStyles();
    const history = useHistory();

    return <>
        <Hidden smDown>
            <Button
                className={clsx(classes.sidebarItem, { [classes.selected]: name === selected })}
                onClick={() => history.push(route)}
            >
                {children}
            </Button>
        </Hidden>

        <Hidden mdUp>
            <IconButton
                className={clsx(classes.sidebarItem, { [classes.selected]: name === selected })}
                onClick={() => history.push(route)}
            >
                {children}
            </IconButton>
        </Hidden>
    </>
}
