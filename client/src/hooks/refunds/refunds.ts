import { useSnackbar } from "notistack";
import { useGet, useLazyGet } from "../../api";

export const useGetRefunds = (params?: any) => useGet('/refunds', { params });

export const useRefundAction = (id: string, action: 'accept' | 'decline') => {
    const { enqueueSnackbar } = useSnackbar();
    const { get, ...state } = useLazyGet(`/refunds/${id}/${action}`);

    const actionStatus = action === 'accept' ? 'accepted' : 'declined';

    const execute = async () => {
        try {
            await get();
            enqueueSnackbar(
                `Refund ${actionStatus}!`,
                { variant: 'success' }
            );
        } catch (error) {
            enqueueSnackbar(
                `Failed to ${action} refund: ${error.message}`,
                { variant: 'error' }
            );
        }
    }

    return { execute, ...state };
}
