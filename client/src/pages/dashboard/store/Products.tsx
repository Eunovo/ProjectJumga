import { useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ProductGrid } from "../../../components/products";
import { useLazyGetProducts } from "../../../hooks/products";
import { useCurrentUser } from "../../../state/AppState";
import { useStyles } from "../styles"
import { StorePage } from "./StorePage"


type Keys = "name" | "image" | "price" | "url";

export const StoreProducts = () => {
    const classes = useStyles();
    const history = useHistory();
    const { user, ready } = useCurrentUser();
    const { getProducts, data, loading } = useLazyGetProducts();

    useEffect(() => {
        if (!ready || !user) return;
    
        getProducts({ store: user.seller.storeName });
    }, [user, ready]);


    let products = data?.products || [];
    products = products.map((p: any) => ({ ...p, image: p.images[0] }));

    return <StorePage selected='products'>
        <>

            <div className={classes.header} style={{
                display: 'flex', alignItems: 'flex-end',
                flexWrap: 'wrap'
            }}>

                <Typography variant='h4'>
                    Products
                </Typography>

                <Button
                    color='primary'
                    variant='text'
                    style={{ marginLeft: '1rem' }}
                    onClick={() => history.push('/dashboard/products/add')}
                >
                    new
                </Button>

            </div>

            <ProductGrid
                products={products}
                placeholder={loading}
                placeholderLength={10}    
            />

        </>
    </StorePage>
}
