import { Role, Admin } from '../../../models';
import {
    Settings,
    UserTab
} from '../settings';
import { AdminPage } from './AdminPage';


const user: Omit<Admin, "createdAt"> = {
    firstName: 'Novo', lastName: 'Bob',
    email: 'test@g.com',
    address: {
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Lagos',
        street: 'Badmus Street'
    },
    role: Role.admin
};

export const AdminSettings = () => {
    return <AdminPage selected='settings'>
        <Settings tabs={['General Information']}>
            <UserTab user={user} index={0} />
        </Settings>
    </AdminPage>
}
