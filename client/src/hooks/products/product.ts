import { useGet, useMutate } from "../../api";
import { Product } from "../../models";


export const useAddProduct = () => {
    const { mutate, ...state } = useMutate('/products', 'post');
    return { addProduct: mutate, ...state };
}

export const useGetProducts = (params: Partial<Pick<Product, "name" | "url">>) =>
    useGet('/products/', { params });
