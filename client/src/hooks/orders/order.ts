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
        try {
            const response = await mutate(data);
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

    return { ...state, createAndPay };
}

export const useGetOrders = (type?: "rider" | "store" | "", params?: any) =>
    useGet(`/orders/${type}`, { params });

export const useGetOrderByTxRef = (txRef: string) =>
    useGet(`/order/tx-ref/${txRef}`);

export const useOrderDrop = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { get, ...state } = useLazyGet('/orders/drop');

    const dropOrder = async (orderId: string, userId: string) => {
        try {
            await get({ params: { orderId, userId } });
        } catch (error) {
            enqueueSnackbar(
                `Operation Failed: ${error.message}`,
                { variant: 'error' }
            );
        }
    }

    return { dropOrder, ...state };
}

export const useCancelOrder = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { get, ...state } = useLazyGet('/orders/cancel');

    const cancelOrder = async (orderId: string) => {
        try {
            await get({ params: { orderId } });
        } catch (error) {
            enqueueSnackbar(
                `Failed to cancel order: ${error.message}`,
                { variant: 'error' }
            );
        }
    }

    return { cancelOrder, ...state };
}
