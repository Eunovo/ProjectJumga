import Alert from '@material-ui/lab/Alert';
import { Box, Typography } from "@material-ui/core";
import { ProductForm } from "../../../components/products";
import { useAddProduct } from "../../../hooks/products";
import { useStyles } from "../styles"
import { StorePage } from "./StorePage"
import { useHistory } from 'react-router-dom';


export const StoreAddProduct = () => {
    const { addProduct, loading, error } = useAddProduct();
    const history = useHistory();
    const classes = useStyles();

    return <StorePage selected='products'>
        <>

            <Typography className={classes.header} variant='h4'>
                Add Product
            </Typography>

            {error?.message && <Box
                maxWidth={'40rem'}
                marginX='auto'
                marginY={2}
            >
                <Alert severity='error'>{error.message}</Alert>
            </Box>}

            <ProductForm
                loading={loading}
                onSubmit={async (values, actions) => {
                    try {
                        await addProduct(values);
                        history.push('/dashboard/products');
                    } catch (error) {
                        actions.setErrors(error?.errors);
                    }
                }} />

        </>
    </StorePage>
}
