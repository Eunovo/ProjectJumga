import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { ProductGrid } from "../../components/products";
import { useGetProducts } from '../../hooks/products';

type Keys = "name" | "image" | "price" | "url";

export const Home = () => {
    const { data, loading } = useGetProducts({ accessible: true });
    const products = data?.products || [];
    return <Container>

        <Box marginY={8}>
            <ProductGrid
                products={products}
                placeholder={loading}
                placeholderLength={10}
                allowAddToCart
            />
        </Box>

    </Container>
}
