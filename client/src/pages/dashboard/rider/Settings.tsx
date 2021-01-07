import { Role, Rider } from '../../../models';
import {
    Settings,
    UserTab,
    AccountTab
} from '../settings';
import { RiderPage } from './RiderPage';


const user: Rider = {
    firstName: 'Novo', lastName: 'Bob',
    email: 'test@g.com',
    address: {
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Lagos',
        street: 'Badmus Street'
    },
    role: Role.seller,
    accountName: 'Novo Bob',
    accountNumber: '0177298559',
    bank: 'Access Bank'
};

export const RiderSettings = () => {
    return <RiderPage selected='settings'>
        <Settings tabs={['General Information', 'Account Information']}>
            <UserTab user={user} index={0} />
            <AccountTab user={user} index={1} />
        </Settings>
    </RiderPage>
}
