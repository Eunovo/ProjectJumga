import { useMutate } from '../../api';

export const useLogin = () => {
    const { mutate, ...state } = useMutate('/auth/login', 'post');

    const login = (data: any) => mutate(data);

    return { login, ...state };
}
