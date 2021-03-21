import { useSnackbar } from "notistack";
import { useGet, useMutate } from "../../api";
import { useCurrentUser } from "../../state/AppState";


export const useGetPayouts = (params?: any) => useGet("/payouts", { params });
export const useRequestPayout = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { user, setUser } = useCurrentUser();
    const { mutate, ...state } = useMutate('/payouts', 'post');
    const withdraw = async (amount: number) => {
        if (!setUser) return;

        try {
            await mutate({ amount });
            setUser({ ...user, wallet: user.wallet - amount });
            enqueueSnackbar('Queued', { variant: 'success' });
        } catch (error) {
            throw error;
        }
    };

    return { withdraw, ...state };
}
