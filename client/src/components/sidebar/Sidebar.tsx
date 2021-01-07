import clsx from "clsx";
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import { BottomMenu } from './BottomMenu';
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


interface NavigationProps {
    classes?: {
        sideBar?: string,
        bottomBar?: string
    }
    navs: Nav[]
    selected: string
}

export const Navigation: React.FC<NavigationProps> = ({ classes, navs, selected }) => {
    const sidebarClasses = useSideBarStyles();

    return <>
        <Hidden xsDown>
            <div className={clsx(classes?.sideBar, sidebarClasses.sidebar)}>
                {
                    navs.map((nav, i) => (
                        <SideBarItem
                            key={i}
                            name={nav.name}
                            selected={selected}
                            route={nav.route}
                        >
                            {nav.icon}
                            <Hidden smDown>
                                {nav.name}
                            </Hidden>
                        </SideBarItem>
                    ))
                }
            </div>
        </Hidden>

        <Hidden smUp>
            <BottomMenu className={classes?.bottomBar} navs={navs} />
        </Hidden>
    </>
}

