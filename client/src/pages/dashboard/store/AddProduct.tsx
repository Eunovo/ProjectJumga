import { Button, Typography } from "@material-ui/core";
import { ProductForm } from "../../../components/products";
import { Product } from "../../../models";
import { useStyles } from "../styles"
import { StorePage } from "./StorePage"


export const StoreAddProduct = () => {
    const classes = useStyles();

    return <StorePage selected='products'>
        <>

            <Typography className={classes.header} variant='h4'>
                Add Product
            </Typography>

            <ProductForm onSubmit={async (values, actions) => { }} />

        </>
    </StorePage>
}
