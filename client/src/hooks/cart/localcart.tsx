import { useSnackbar } from "notistack";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"
import { Product } from "../../models";


type Keys = "name" | "price" | "image" | "url";
type ProductInfo = Pick<Product, Keys>;

export type CartItem = ProductInfo & { quantity: number };

type Cart<T = any> = {
    [P in keyof T]: CartItem
}

const CartContext = createContext<{
    cart: Cart,
    increment?: (product: ProductInfo, quantity: number) => void,
    decrement?: (product: ProductInfo, quantity: number) => void
}>({
    cart: {}
});

export const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<Cart>({});
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // TODO save cart by logged in user
        const storedCart = localStorage.getItem('CART');
        if (!storedCart) return;
        try {
            setCart(JSON.parse(storedCart));   
        } catch (error) {
            enqueueSnackbar('Failed to load Cart!', { variant: 'error' });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('CART', JSON.stringify(cart));
    }, [cart]);

    const increment = (product: ProductInfo, quantity: number) => setCart(
        (c) => ({
            ...c,
            [product.url]: {
                ...product,
                quantity: (c[product.url]?.quantity || 0) + quantity
            }
        })
    );
    const decrement = (product: ProductInfo, quantity: number) => setCart(
        (c) => ({
            ...c,
            [product.url]: {
                ...product,
                quantity:  Math.max((c[product.url]?.quantity || 0) - quantity, 0)
            }
        })
    );

    const cartOfProductsAboveZero = Object.keys(cart)
        .reduce((prev: any, cur: string) => {
            if (cart[cur].quantity === 0) return prev;
            return { ...prev, [cur]: cart[cur] };
        }, {});

    return <CartContext.Provider value={{
        cart: cartOfProductsAboveZero,
        increment,
        decrement
    }}>
        {children}
    </CartContext.Provider>
}

export const useCart = () => {
    return useContext(CartContext);
}
