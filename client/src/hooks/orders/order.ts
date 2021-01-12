import { useSnackbar } from "notistack";
import { useGet, useMutate } from "../../api";


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
