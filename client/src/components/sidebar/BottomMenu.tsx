import { useState } from 'react';
import clsx from 'clsx';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom';
import { Nav } from './Sidebar';


interface BottomMenuProps {
    className?: string;
    navs: Nav[];
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ className, navs }) => {
    const history = useHistory();
    const [value, setValue] = useState(navs[0].name);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return <BottomNavigation
        className={clsx(className)}
        value={value}
        onChange={handleChange}
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
