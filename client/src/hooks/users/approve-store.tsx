import { useSnackbar } from "notistack";
import { useLazyGet } from "../../api";


export const useApproveStore = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { get, ...state } = useLazyGet('/users/approve');

    const approveStore = async () => {
        const response = await get();
        const link = response?.data?.paymentLink;
        
        if (!link) {
            enqueueSnackbar(
                `Could not complete payment`, { variant: 'error' });
        }

        window.open(link, '_blank');
    }

    return { ...state, approveStore };
}
