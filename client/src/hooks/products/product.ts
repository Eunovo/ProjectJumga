import { useSnackbar } from "notistack";
import { useGet, useLazyGet, useMutate } from "../../api";
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

export const useGetProducts = (params?: Partial<Pick<Product, "accessible" | "name" | "url">>) =>
    useGet('/products', { params });


export const useLazyGetProducts = () => {
    const { get, ...state } = useLazyGet('/products');
    const getProducts = (params?: Partial<Pick<Product, "accessible" | "name" | "url" | "store">>) => 
        get({ params });
    return { getProducts, ...state };
}

