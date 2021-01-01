import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import { getByKey, saveOrUpdate } from './Storage';


interface CurrentUserState {
    /**
     * `ready` is `false` while the app tries to
     * retrieve local login state
     */
    ready?: boolean;

    user?: any;

    setUser?: (user: any) => void;
}

const context = createContext<CurrentUserState>({});

export const CurrentUserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<any>();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (user) {
            try {
                saveOrUpdate('user', user);
            } catch (e) {
                console.error('Failed to persist user: ', e.message);
            }
        } else if (!ready) {
            try {
                const result: any = getByKey('user');
                setUser(result);
                setReady(true);
            } catch (err) {
                console.error('Failed to retrieve logged in user: ', err.message);
                setReady(true);
            }
        }
    }, [user, ready, setUser, setReady]);

    return <context.Provider value={{ ready, user, setUser }}>
        {children}
    </context.Provider>
}

export const useCurrentUser = () => {
    return useContext(context);
}
