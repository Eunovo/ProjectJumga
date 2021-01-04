import clsx from "clsx";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useSideBarStyles } from "./styles";

interface SideBarItemProps {
    name: string;
    selected: string;
    route: string;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ children, name, selected, route }) => {
    const classes = useSideBarStyles();
    const history = useHistory();

    return <Button
        className={clsx(classes.sidebarItem, { [classes.selected]: name === selected })}
        onClick={() => history.push(route)}
    >
        {children}
    </Button>
}
