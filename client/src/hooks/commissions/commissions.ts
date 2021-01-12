import { useGet, useMutate } from "../../api"


export const useGetCommissions = (params?: any) =>
    useGet('/commissions', { params });

export const useUpdateCommissions = () => {
    const { mutate, ...state } = useMutate('/commissions', 'put');
    return { ...state, updateCommissions: mutate };
}
