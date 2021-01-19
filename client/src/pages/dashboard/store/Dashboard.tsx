import { useEffect } from 'react';
import {
    Box,
    CircularProgress,
    Hidden,
    Paper,
    Typography
} from '@material-ui/core';
import { useStyles } from '../styles';
import { StorePage } from './StorePage';
import { useCurrentUser } from '../../../state/AppState';
import { useApproveStore } from '../../../hooks/users';
import { LineChart } from '../../../components/charts';
import { SpinnerButton } from '../../../components/forms';
import { HorizontalProductsView } from '../../../components/products';
import { Amount } from '../../../components/Utils';
import { useGetCommissions, useLazyGetProducts } from '../../../hooks';
import { SetupAccountAlert } from '../SetupAcccountAlert';


export const StoreDashboard = () => {
    const { user } = useCurrentUser();
    const classes = useStyles();
    const isApproved = user.seller?.approved;

    return <StorePage selected='dashboard'>
        <>
            <Typography
                align='center'
                className={classes.header}
                variant='h4'
            >
                Welcome {user?.firstName}!
            </Typography>

            <Box marginBottom={4}>
                <SetupAccountAlert />
            </Box>

            {
                isApproved ? <ApprovedStore /> : <ApproveSection />
            }

        </>
    </StorePage>;
}

const ApproveSection = () => {
    const { approveStore, loading } = useApproveStore();
    const { data, loading: fetching } =
        useGetCommissions({ key: 'storeapproval' });
    const storeApprovalFee = data?.commissions?.[0]?.value || 0;

    return <Box
        width='100%'
        maxWidth='35rem'
        marginX={'auto'}
    >
        <Paper variant='outlined'>

            {
                fetching ?
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        width='100%'
                        height='100%'
                    >
                        <CircularProgress />
                    </Box>
                    : <Box
                        padding={4}
                    >
                        <Box marginBottom={2}>
                            <Typography align='center' variant='h6'>
                                Your account is not active!
                            </Typography>
                        </Box>

                        <Typography align='center' variant='body1'>
                            Customers will not be able to see or purchase your products
                            on our platform until you activate your account.
                            You have to pay a one-time fee of{' '}
                            <Amount amount={storeApprovalFee} currency='USD' sign />
                            {' '}to activate your account
                        </Typography>

                        <Box
                            width='fit-content'
                            marginX={'auto'}
                            marginTop={3}
                        >
                            <SpinnerButton
                                color='primary'
                                variant='contained'
                                onClick={approveStore}
                                loading={loading}
                            >
                                pay{' '}
                                <Amount amount={storeApprovalFee} currency='USD' sign />
                                {' '}now to activate your account
                            </SpinnerButton>
                        </Box>
                    </Box>
            }

        </Paper>
    </Box>
}

const ApprovedStore = () => {
    const classes = useStyles();
    const { user, ready } = useCurrentUser();
    const { getProducts, data } = useLazyGetProducts();

    const topProducts = data?.products || [];

    useEffect(() => {
        if (!ready || !user) return;

        getProducts({ store: user.storeName });
    }, [user, ready]);

    return <>

        <Box
            display='flex'
            justifyContent='center'
            alignItems='stretch'
            flexWrap='wrap'
            marginBottom={4}
        >
            <Box marginY={1} marginX={1} minHeight='6rem'>
                <Paper variant='outlined' style={{ height: '100%' }}>
                    <Box padding={2} width='15rem'>
                        <Typography variant='caption'>Your earnings this month</Typography>

                        <Typography style={{
                            fontWeight: 'bold', fontSize: '1.5rem', marginBlock: '1rem'
                        }}>
                            <Amount amount={47877} currency='USD' sign />
                        </Typography>

                        <Typography variant='body2' style={{ color: 'green' }}>
                            +12.72% from last month</Typography>
                    </Box>
                </Paper>
            </Box>

            <Box marginY={1} marginX={1}>
                <Paper variant='outlined' style={{ height: '100%' }}>
                    <Box padding={2} width='15rem'>
                        <Typography variant='caption'>Your sales this month</Typography>

                        <Typography style={{
                            fontWeight: 'bold', fontSize: '1.5rem', marginBlock: '1rem'
                        }}>
                            325
                        </Typography>

                        <Typography variant='body2' style={{ color: 'green' }}>
                            +8.23% from last month</Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>

        <Hidden smDown>
            <LineChart />
        </Hidden>

        <div style={{ marginTop: '5rem' }}>

            <Typography className={classes.header} align='center' variant='h5'>
                Top Selling Products</Typography>

            <HorizontalProductsView products={topProducts} />

        </div>
    </>
}
