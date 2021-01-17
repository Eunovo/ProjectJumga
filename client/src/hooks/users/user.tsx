import { useState } from 'react';
import { useGet, useMutate } from "../../api";
import { useCurrentUser } from '../../state/AppState';
import { useLogin } from "./login";


export const useAddUser = () => {
    const { mutate, ...state } = useMutate('/users', 'post');
    return { addUser: mutate, ...state };
}

export const useGetUsers = (params?: any) => useGet('/users', { params });

export const useSignup = () => {
    const [state, setState] = useState<any>({
        signupComplete: false, loading: false, error: null
    });
    const { login } = useLogin();
    const { mutate } = useMutate('/users', 'post');

    const signup = async (data: any) => {
        if (state.loading || state.signupComplete) return;
        
        try {
            setState((s: any) => ({ ...s, loading: true }));
            await mutate(data);
            setState((s: any) => ({ ...s, signupComplete: true }));
            await login({
                email: data.email,
                password: data.password
            });
            setState((s: any) => ({ ...s, loading: false }));
        } catch (error) {
            setState((s: any) => ({ ...s, loading: false, error }));
            throw error;
        }
    }

    return { signup, ...state };
}

export const useUpdateUser = () => {
    const { setUser } = useCurrentUser();
    const { mutate, ...state } = useMutate('/users', 'put');

    const updateUser = async (data: any, filter: any) => {
        if (!setUser) return;

        try {
            await mutate(data, { params: filter });
            setUser((user: any) => ({ ...user, ...data }));
        } catch (error) {
            throw error;
        }
    }

    return { updateUser, ...state };
}
