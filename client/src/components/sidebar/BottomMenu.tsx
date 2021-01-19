import clsx from 'clsx';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Nav } from './Sidebar';


interface BottomMenuProps {
    className?: string;
    navs: Nav[];
    selected: string;
}

const StyledBottomNavigationAction = withStyles({
    root: {
        minWidth: 'auto'
    }
})(BottomNavigationAction);


export const BottomMenu: React.FC<BottomMenuProps> = ({ className, navs, selected }) => {
    const history = useHistory();

    return <BottomNavigation
        className={clsx(className)}
        value={selected}
    >
        {
            navs.map((nav, i) => (
                <StyledBottomNavigationAction
                    key={i}
                    label={nav.name}
                    value={nav.name}
                    icon={nav.icon}
                    onClick={() => history.push(nav.route)}
                />
            ))
        }
    </BottomNavigation>
}
