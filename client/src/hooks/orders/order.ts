import { useSnackbar } from "notistack";
import { useGet, useLazyGet, useMutate } from "../../api";


export const usePayOrder = () => {
    const { get, ...state } = useLazyGet('/orders/pay');
    const { enqueueSnackbar } = useSnackbar();

    const payOrder = async (orderId: string) => {
        try {
            const response = await get({ params: { id: orderId } });
            const link = response?.data?.paymentLink;

            if (!link) {
                enqueueSnackbar(
                    `Could not complete payment`, { variant: 'error' });
            }
    
            window.open(link, '_blank');
        } catch (error) {
            enqueueSnackbar(
                `Could not complete payment: ${error.message}`,
                { variant: 'error' }
            );
            throw error;
        }
    }

    return { payOrder, ...state };
}

export const useCreateAndPayOrder = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { mutate, ...state } = useMutate('/orders/pay', 'post');

    const createAndPay = async (data: any) => {
        const response = await mutate(data);
        const link = response?.data?.paymentLink;
        
        if (!link) {
            enqueueSnackbar(
                `Could not complete payment`, { variant: 'error' });
        }

        window.open(link, '_blank');
    }

    return { ...state, createAndPay };
}

export const useGetOrders = (type: "rider" | "store", params?: any) =>
    useGet(`/orders/${type}`, { params });
