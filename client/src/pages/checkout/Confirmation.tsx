import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { SpinnerButton } from '../../components/forms';
import { Amount } from '../../components/Utils';
import { useCart } from '../../hooks/cart';
import { useCreateAndPayOrder } from '../../hooks/orders';
import { CheckoutForm } from './BuyerForm';


interface ConfirmationProps {
    form?: CheckoutForm
    backToCheckout: () => void
}

export const Confirmation: React.FC<ConfirmationProps> = ({
    form,
    backToCheckout
}) => {
    const { cart } = useCart();
    const { createAndPay, loading } = useCreateAndPayOrder();
    const history = useHistory();
    const theme = useTheme();

    const deliveryFee = 0;
    const cartTotal = Object.values(cart)
        .reduce((prev, cur) => prev + (cur.quantity * cur.price), 0);
    const totalPrice = deliveryFee + cartTotal;

    const submit = () => {
        createAndPay({
            customer: {
                name: form?.fullName,
                email: form?.email
            },
            deliveryAddress: {
                country: form?.deliveryCountry,
                state: form?.deliveryState,
                city: form?.deliveryCity,
                street: form?.deliveryStreet
            },
            sales: Object.keys(cart)
                .map(key => {
                    const { quantity, url } = cart[key];
                    return { product: url, quantity };
                })
        });
    };

    return <>

        <Box marginY={6}>
            <Typography variant='h4'>Summary</Typography>
        </Box>

        <Box
            borderBottom={`solid 1px ${theme.palette.grey[500]}`}
            borderTop={`solid 1px ${theme.palette.grey[500]}`}
            paddingY={2}
            paddingX={2}
        >

            <Grid container spacing={3}>

                <Header xs={6}>Products</Header>
                <Header>Quantity</Header>
                <Header align='right'>Price</Header>

            </Grid>

            {
                Object.values(cart).map((item, i) => (
                    <Grid
                        container
                        spacing={3}
                        key={i}
                        style={{
                            paddingBlock: theme.spacing()
                        }}
                    >
                        <Grid item xs={6}>{item.name}</Grid>
                        <Grid item xs>{item.quantity}</Grid>
                        <Grid item xs>
                            <Typography align='right'>
                                <Amount
                                    amount={item.quantity * item.price}
                                    currency='USD'
                                    sign
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                ))
            }

            <Grid
                container
                spacing={3}
                style={{
                    paddingBlock: theme.spacing()
                }}
            >

                <Grid item xs>
                    <Typography>
                        Delivery Fee
                    </Typography>
                </Grid>

                <Grid item xs>
                    <Typography align='right'>
                        <Amount
                            amount={deliveryFee}
                            currency='USD'
                            sign
                        />
                    </Typography>
                </Grid>

            </Grid>

            <Box
                borderColor={theme.palette.grey[500]}
                borderTop='solid 1px'
                paddingTop={2}
                marginX={-2}
                paddingX={2}
            >

                <Grid container spacing={3}>
                    <Grid item xs>
                        Total
                    </Grid>

                    <Grid item xs>
                        <Typography align='right' style={{ fontWeight: 'bold' }}>
                            ${totalPrice}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>


        </Box>

        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            marginY={6}
        >

            <SpinnerButton
                color='primary'
                variant='contained'
                onClick={submit}
                loading={loading}
            >
                continue to pay
            </SpinnerButton>

            <Button
                onClick={() => backToCheckout()}
                style={{
                    marginTop: theme.spacing(2)
                }}
            >
                back to checkout
            </Button>

            <Button
                onClick={() => history.push('/cart')}
                style={{
                    marginTop: theme.spacing(2)
                }}
            >
                back to cart
            </Button>

        </Box>

    </>
}

const Header: React.FC<{ align?: 'right', xs?: 3 | 6 }> = ({ children, align, xs = 3 }) => (
    <Grid item xs={xs}>
        <Box paddingBottom={2}>
            <Typography align={align} style={{ fontWeight: 'bold' }}>
                {children}
            </Typography>
        </Box>
    </Grid>
);
