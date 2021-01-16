import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link, useRouteMatch } from 'react-router-dom';
import { useCart } from '../../hooks/cart';
import { SpinnerButton } from '../../components/forms';
import { usePayOrder, useGetOrderByTxRef } from '../../hooks/orders';
import { OrderStatus } from '../../models';


export const Purchase = () => {
    const { clear } = useCart();
    const { payOrder, loading } = usePayOrder();
    const match = useRouteMatch();
    const queryParams = new URLSearchParams(match.url);
    const tranxRef = queryParams.get('tx_ref') || '';
    const { data, loading: fetching } = useGetOrderByTxRef(tranxRef);

    const orderId = data?._id;
    const success = data?.status === OrderStatus.paid;

    useEffect(() => {
        if (!clear) return;
        clear();
    }, [clear]);

    let view = <>
        {
            success ?
                <Typography align='center'>Your payment was completed successfully!</Typography>
                : <>
                    <Typography>Could not complete your order</Typography>

                    <Box marginTop={2}>
                        <SpinnerButton
                            color='primary'
                            variant='contained'
                            onClick={() => payOrder(orderId)}
                            loading={loading}
                        >
                            try again
                        </SpinnerButton>
                    </Box>
                </>
        }

        <Box
            display='block'
            marginTop={2}
            marginX='auto'
        >
            <Link to='/'>Go Home</Link>
        </Box>
    </>;

    if (fetching)
        view = <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            width='100%'
            height='100%'
        >
            <CircularProgress />
        </Box>;

    return <Container>{view}</Container>
}
