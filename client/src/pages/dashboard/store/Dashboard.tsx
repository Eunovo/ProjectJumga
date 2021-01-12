import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import { HorizontalProductsView } from '../../../components/products';
import { StorePage } from './StorePage';
import { useCurrentUser } from '../../../state/AppState';
import { useApproveStore } from '../../../hooks/users';
import { SpinnerButton } from '../../../components/forms';


export const StoreDashboard = () => {
    const { user } = useCurrentUser();
    const classes = useStyles();
    const isApproved = user.approved;

    return <StorePage selected='dashboard'>
        <>
            <Typography
                align='center'
                className={classes.header}
                variant='h4'
            >
                Welcome {user?.firstName}!
            </Typography>

            {
                isApproved ? <ApprovedStore /> : <ApproveSection />
            }

        </>
    </StorePage>;
}

const ApproveSection = () => {
    const { approveStore, loading } = useApproveStore();

    return <Box
        width='100%'
        maxWidth='35rem'
        marginX={'auto'}
    >
        <Paper variant='outlined'>

            <Box
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
                    You have to pay a one-time fee of $20 to activate your account
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
                        pay $20 now to activate your account
                    </SpinnerButton>
                </Box>
            </Box>

        </Paper>
    </Box>
}

const ApprovedStore = () => {
    const classes = useStyles();
    const topProducts = [
        {
            name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
            image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
            url: 'tech-no-beebop'
        },
        {
            name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
            image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
            url: 'tech-no-beebop'
        },
        {
            name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
            image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
            url: 'tech-no-beebop'
        },
        {
            name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
            image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
            url: 'tech-no-beebop'
        },
        {
            name: 'Tecno POP4 (BC2) 6" Screen 32GB ROM + 2GB RAM, 8MP/5MP Camera, Android Q (Go Edition), 5000mah - Ice Lake Green',
            image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/781166/1.jpg?7012',
            url: 'tech-no-beebop'
        }
    ];

    return <>
        <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='space-between'
            marginTop={-2}
            width='100%'
            maxWidth='60rem'
            marginX='auto'
        >

            <div className={classes.infoBlock}>
                <div className={classes.infoBlockMain}>1000</div>
                <div className={classes.infoBlockSub}>Products Sold</div>
            </div>

            <div className={classes.infoBlock}>
                <div className={classes.infoBlockMain}>10</div>
                <div className={classes.infoBlockSub}>Refunds</div>
            </div>

            <div className={classes.infoBlock}>
                <div className={classes.infoBlockMain}>4.5</div>
                <div className={classes.infoBlockSub}>Average Rating</div>
            </div>

            <div className={classes.infoBlock}>
                <div className={classes.infoBlockMain}>$100.00</div>
                <div className={classes.infoBlockSub}>Average Weekly Sale</div>
            </div>

        </Box >


        <div style={{ marginTop: '5rem' }}>

            <Typography className={classes.header} variant='h5'>Top Selling Products</Typography>

            <HorizontalProductsView products={topProducts} />

        </div>
    </>
}
