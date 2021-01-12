import { useCurrentUser } from '../../../state/AppState';
import {
    Settings,
    UserTab,
    AccountTab
} from '../settings';
import { RiderPage } from './RiderPage';


export const RiderSettings = () => {
    const { user } = useCurrentUser();

    return <RiderPage selected='settings'>
        <Settings tabs={['General Information', 'Account Information']}>
            <UserTab user={user} index={0} />
            <AccountTab user={user} account={user.account} index={1} />
        </Settings>
    </RiderPage>
}
