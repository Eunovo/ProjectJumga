import { useSnackbar } from "notistack";
import { useGet, useMutate } from "../../api"


export const useGetCommissions = (params?: any) =>
    useGet('/commissions', { params });

export const useUpdateCommissions = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { mutate, ...state } = useMutate('/commissions', 'put');

    const updateCommissions = async (body: any, options?: any) => {
        try {
            await mutate(body, options);
            enqueueSnackbar(
                'Fees and Commissions updated successfully!',
                { variant: 'success' }
            );
        } catch (error) {
            throw error;
        }
    }

    return { ...state, updateCommissions };
}
