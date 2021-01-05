import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ProductGrid } from "../../components/products";
import { Product } from "../../models";

type Keys = "name" | "image" | "price" | "url";
const products: Pick<Product, Keys>[] = [
    {
        name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
        image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
        price: 10000,
        url: 'Tecno-POP4-658'
    },
    {
        name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
        image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
        price: 10000,
        url: 'Tecno-POP4-658'
    },
    {
        name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
        image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
        price: 10000,
        url: 'Tecno-POP4-658'
    },
    {
        name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
        image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
        price: 10000,
        url: 'Tecno-POP4-658'
    }
];

export const Home = () => {
    return <Container>

        <Box marginY={8}>
            <ProductGrid products={products} allowAddToCart />
        </Box>

    </Container>
}
