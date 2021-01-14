import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { HorizontalOptionButtons, SpinnerButton } from '../../components/forms';
import { useCancelOrder, useGetOrders } from '../../hooks/orders';
import { OrderStatus } from '../../models';
import { useCurrentUser } from '../../state/AppState';
import { useGetProducts } from '../../hooks/index.';


export const Purchases = () => {
    const { user } = useCurrentUser();

    const [selected, setSelected] = useState('all');

    const statuses = ['all'].concat(Object.values(OrderStatus));
    const currrentStatus = (selected === 'all' ? undefined : selected) as OrderStatus;

    const { data, loading } = useGetOrders("", {
        createdBy: user?._id, status: currrentStatus
    });
    const orders = data?.orders || [];

    let View = orders.map((order: any, i: number) =>
        <Order key={i} order={order} />);

    if (loading) {
        for (let i = 0; i < 3; i++) {
            View.push(<Order key={i} placeholder />)
        }
    }


    return <Container>

        <Box marginX='auto' maxWidth='50rem' paddingY={3}>
            <Box marginBottom={4}>
                <Typography variant='h4'>Purchases</Typography>
            </Box>

            <HorizontalOptionButtons
                options={statuses}
                selected={selected}
                setSelected={setSelected}
            />

            <Box marginTop={2}>
                {View}
            </Box>
        </Box>

    </Container>
}


interface OrderProps {
    order?: any
    placeholder?: boolean
}

const Order: React.FC<OrderProps> = ({ order, placeholder }) => {
    const sales = order?.sales || [];

    const View = placeholder ? [
        <Sale key={'p_0'} placeholder />,
        <Sale key={'p_1'} placeholder />
    ] : sales.map((sale: any, i: number) => (<Sale key={i} sale={sale} />));

    return <Box marginY={2}>
        <Paper elevation={0}>
            <Box padding={2}>
                <Box
                    display='flex'
                    justifyContent='space-between'
                >
                    {
                        placeholder ? <>
                            <Skeleton style={{ width: '8rem' }} />
                            <Skeleton style={{ width: '5rem' }} />
                        </> : <>
                                <Typography variant='h6'>{order?.code}</Typography>

                                <Typography>{order?.status?.toUpperCase()}</Typography>

                                {
                                    order?.status !== 'completed' || order?.status !== 'cancelled'
                                    && <CancelButton orderId={order?._id} />
                                }
                            </>
                    }
                </Box>

                {View}
            </Box>
        </Paper>
    </Box>
}

const CancelButton: React.FC<{ orderId: string }> = ({ orderId }) => {
    const { cancelOrder, loading } = useCancelOrder();

    return <SpinnerButton
        variant='contained'
        color='primary'
        loading={loading}
        onClick={() => cancelOrder(orderId)}
    >
        cancel
    </SpinnerButton>;
}

interface SaleProps {
    sale?: any
    placeholder?: boolean
}

const ImageSkeleton = withStyles({
    root: {
        height: '100%',
        transform: 'none'
    }
})(Skeleton);

const Sale: React.FC<SaleProps> = ({ sale, placeholder }) => {
    const { data, loading } = useGetProducts({ url: sale?.product });
    const product = data?.products[0];

    if (placeholder === undefined)
        placeholder = loading;

    return <Box display='flex' paddingY={2}>

        <Box
            height='8rem'
            width='8rem'
            marginRight={2}
        >
            {
                placeholder ? <ImageSkeleton /> :
                    <img
                        src={`${process.env.REACT_APP_API}/files/${product?.images[0]}`}
                        alt={product?.name || ''}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                    />
            }
        </Box>

        <Box minWidth='40%'>

            <Typography variant='caption'>Name</Typography>

            <Typography>
                {placeholder ? <Skeleton /> : product?.name}
            </Typography>

            <Typography variant='caption'>Qantity</Typography>
            <Typography>
                {placeholder ? <Skeleton style={{ width: '50%', minWidth: '4rem' }} /> : sale.quantity}
            </Typography>

            <Typography variant='caption'>Amount</Typography>

            <Typography>
                {placeholder ? <Skeleton style={{ width: '50%', minWidth: '4rem' }} /> : `$ ${sale.amount}`}
            </Typography>

        </Box>

    </Box>
};