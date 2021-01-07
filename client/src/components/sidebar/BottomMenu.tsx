import clsx from 'clsx';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom';
import { Nav } from './Sidebar';


interface BottomMenuProps {
    className?: string;
    navs: Nav[];
    selected: string;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ className, navs, selected }) => {
    const history = useHistory();

    return <BottomNavigation
        className={clsx(className)}
        value={selected}
    >
        {
            navs.map((nav, i) => (
                <BottomNavigationAction
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
