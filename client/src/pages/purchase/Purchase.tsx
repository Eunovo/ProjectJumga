import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/cart';
import { SpinnerButton } from '../../components/forms';
import { usePayOrder, useGetOrderByTxRef } from '../../hooks/orders';
import { OrderStatus } from '../../models';


export const Purchase = () => {
    const { clear } = useCart();
    const { payOrder, successful, loading } = usePayOrder();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tranxRef = queryParams.get('tx_ref') || '';
    const { data, loading: fetching } = useGetOrderByTxRef(tranxRef);

    const orderId = data?._id;
    const success = data?.status === OrderStatus.paid;

    useEffect(() => {
        if (!clear) return;
        clear();
    }, [clear]);

    let view = <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100%'
        fontSize='2rem'
        textAlign='center'
    >
        {
            success ?
                <Typography variant='inherit'>Your payment was completed successfully!</Typography>
                : <>
                    <Typography variant='inherit'>Could not complete your order</Typography>

                    <Box marginTop={2}>
                        <SpinnerButton
                            color='primary'
                            variant='contained'
                            onClick={() => payOrder(orderId)}
                            loading={loading}
                        >
                            {
                                successful ? 'open link'
                                    : 'try again'
                            }
                        </SpinnerButton>
                    </Box>
                </>
        }

        <Box
            marginTop={4}
            fontSize='1.5rem'
        >
            <Link to='/'>Go Home</Link>
        </Box>
    </Box>;

    if (fetching)
        view = <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            width='100%'
            height='100%'
        >
            <CircularProgress size='4rem' />
        </Box>;

    return <Container style={{ height: '80vh' }}>{view}</Container>
}
