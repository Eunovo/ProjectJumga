import { useHistory } from 'react-router-dom';
import { useMutate } from '../../api';
import { useCurrentUser } from '../../state/AppState';

export const useLogin = () => {
    const history = useHistory();
    const { setUser } = useCurrentUser();
    const { mutate, ...state } = useMutate('/auth/login', 'post');

    const login = async (data: any, redirectTo?: string) => {
        const response = await mutate(data);
        if (!response || !setUser)
            throw new Error('An unexpected error occurred');

        const { token, user } = response.data;
        setUser({ ...user, token });
        history.push(redirectTo || '/dashboard');
    };

    return { login, ...state };
}
