import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { HorizontalOptionButtons, SpinnerButton } from '../../components/forms';
import { useCancelOrder, useGetOrders } from '../../hooks/orders';
import { OrderStatus } from '../../models';
import { useCurrentUser } from '../../state/AppState';
import { useGetProducts } from '../../hooks';


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
                {
                    orders.length === 0 && !loading &&
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        height='30rem'
                        textAlign='center'
                        fontSize='2rem'
                    >
                        <Typography variant='inherit'>
                            You have no Purchases.</Typography>

                        <Box marginTop={4} fontSize='1rem'>
                            <Link to='/'>Start Shopping now!</Link>
                        </Box>

                    </Box>
                }
            </Box>
        </Box>

    </Container>
}


interface OrderProps {
    order?: any
    placeholder?: boolean
}

const Order: React.FC<OrderProps> = ({ order: initialOrder, placeholder }) => {
    const [order, setOrder] = useState(initialOrder);
    const sales = order?.sales || [];

    useEffect(() => {
        setOrder(initialOrder);
    }, [initialOrder]);

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
                    alignItems='center'
                    flexWrap='wrap'
                    marginBottom={2}
                >
                    {
                        placeholder ? <>
                            <Skeleton style={{ width: '8rem' }} />
                            <Skeleton style={{ width: '5rem' }} />
                        </> : <>
                                <Typography variant='h6' style={{
                                    width: '100%', maxWidth: '30rem', textTransform: 'capitalize'
                                }}>
                                    {order?.code}</Typography>

                                <Box display='flex' alignItems='center'>
                                    <Typography variant='body2'>{order?.status?.toUpperCase()}</Typography>

                                    {
                                        (order?.status === OrderStatus.pending || order?.status === OrderStatus.paid)
                                        && <Box marginLeft={4}>
                                            <CancelButton
                                                orderId={order?._id}
                                                orderCode={order?.code}
                                                onSuccess={() => setOrder((o: any) => ({ ...o, status: OrderStatus.cancelled }))}
                                            />
                                        </Box>
                                    }
                                </Box>
                            </>
                    }
                </Box>

                {View}
            </Box>
        </Paper>
    </Box>
}

const CancelButton: React.FC<{ orderId: string, orderCode: string, onSuccess: () => void }> =
    ({ orderId, orderCode, onSuccess }) => {
        const { cancelOrder, loading } = useCancelOrder();

        return <SpinnerButton
            variant='contained'
            color='primary'
            loading={loading}
            onClick={async () => {
                try {
                    await cancelOrder(orderId, orderCode);
                    onSuccess();
                } catch (error) { }
            }}
            size='small'
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
                        src={`${process.env.REACT_APP_API_URL}/files/${product?.images[0]}`}
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
