import { useSnackbar } from "notistack";
import { useGet, useLazyGet, useMutate } from "../../api";


export const usePayOrder = () => {
    const { get, data, ...state } = useLazyGet('/orders/pay');
    const { enqueueSnackbar } = useSnackbar();

    const successful = Boolean(data?.paymentLink);

    const payOrder = async (orderId: string) => {
        if (successful) {
            window.open(data.paymentLink, '_blank');
            return;
        }

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

    return { payOrder, successful, ...state };
}

export const useCreateAndPayOrder = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { mutate, data: result, ...state } = useMutate('/orders/pay', 'post');

    const successful = Boolean(result?.paymentLink);

    const createAndPay = async (data: any) => {
        if (successful) {
            window.open(result.paymentLink, '_blank');
            return;
        }

        try {
            const response = await mutate(data);
            const link = response?.data?.paymentLink;

            if (!link) {
                enqueueSnackbar(
                    `Could not complete payment`, { variant: 'error' });
            }

            window.open(link, '_blank');
            return response?.data;
        } catch (error) {
            enqueueSnackbar(
                `Could not complete payment: ${error.message}`,
                { variant: 'error' }
            );
        }
    }

    return {
        ...state,
        createAndPay,
        successful
    };
}

export const useGetOrders = (type?: "rider" | "store" | "", params?: any) =>
    useGet(`/orders/${type}`, { params });

export const useGetOrderByTxRef = (txRef: string) =>
    useGet(`/orders/tx-ref/${txRef}`);

export const useOrderDrop = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { get, ...state } = useLazyGet('/orders/drop');

    const dropOrder = async (orderCode: string, userId: string) => {
        try {
            await get({ params: { orderCode, userId } });
            enqueueSnackbar(
                `Order ${orderCode} has been dropped!`,
                { variant: 'success' }
            );
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
