import { useSnackbar } from "notistack";
import { useLazyGet } from "../../api";


export const useApproveStore = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { get, ...state } = useLazyGet('/users/approve');

    const approveStore = async () => {
        try {
            const response = await get();
            const link = response?.data?.paymentLink;

            if (!link) {
                enqueueSnackbar(
                    `Could not complete payment: ${response?.message}`,
                    { variant: 'error' }
                );
            }

            window.open(link, '_blank');
        } catch (error) {
            enqueueSnackbar(
                `Could not complete payment: ${error.message}`,
                { variant: 'error' }
            );
        }
    }

    return { ...state, approveStore };
}
