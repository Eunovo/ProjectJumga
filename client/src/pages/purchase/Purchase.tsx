import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link, useRouteMatch } from 'react-router-dom';
import { useCart } from '../../hooks/cart';
import { SpinnerButton } from '../../components/forms';
import { usePayOrder } from '../../hooks/orders';


export const Purchase = () => {
    const { clear } = useCart();
    const { payOrder, loading } = usePayOrder();
    const match = useRouteMatch();
    const queryParams = new URLSearchParams(match.url);
    const orderId = queryParams.get('orderId') || '';
    const success = queryParams.get('success');

    useEffect(() => {
        if (!clear) return;
        clear();
    }, [clear]);

    return <Container>
    
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

    </Container>
}
