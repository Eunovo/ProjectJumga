import { useCurrentUser } from '../../../state/AppState';
import {
    Settings,
    UserTab,
    AccountTab
} from '../settings';
import { StorePage } from './StorePage';


export const StoreSettings = () => {
    const { user } = useCurrentUser();

    return <StorePage selected='settings'>
        <Settings tabs={['General Information', 'Account Information']}>
            <UserTab user={user} index={0} />
            <AccountTab user={user} account={user.account} index={1} />
        </Settings>
    </StorePage>
}
