import { useSnackbar } from "notistack";
import { useGet, useMutate } from "../../api";
import { Product } from "../../models";
import { useCurrentUser } from "../../state/AppState";
import { objectToFormData } from "../../utils";


export const useAddProduct = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useCurrentUser();
    const { mutate, ...state } = useMutate('/products', 'post');

    const addProduct = async (product: any) => {
        if (!product.store) {
            product.store = user.storeName;
        }
        product.inStock = true;
        const data = objectToFormData(product);
        await mutate(data);
        enqueueSnackbar(
            `Created "${product.name}" successfully!`,
            { variant: 'success' }
        );
    }

    return { addProduct, ...state };
}

export const useGetProducts = (params?: Partial<Pick<Product, "name" | "url">>) =>
    useGet('/products/', { params });
