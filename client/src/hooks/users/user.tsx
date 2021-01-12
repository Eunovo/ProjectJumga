import { useState } from 'react';
import { useMutate } from "../../api";
import { useLogin } from "./login";


export const useAddUser = () => {
    const { mutate, ...state } = useMutate('/users', 'post');
    return { addUser: mutate, ...state };
}

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
    const { mutate, ...state } = useMutate('/user', 'put');

    const updateUser = (data: any, filter: any) =>
        mutate(data, { params: filter });

    return { updateUser, ...state };
}
