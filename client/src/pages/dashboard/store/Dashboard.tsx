import { Box, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import { HorizontalProductsView } from '../../../components/products';
import { StorePage } from './StorePage';


export const StoreDashboard = () => {
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

    return <StorePage selected='dashboard'>
        <>
            <Typography className={classes.header} variant='h4'>Welcome Owner!</Typography>

            <Box
                display='flex'
                flexWrap='wrap'
                justifyContent='space-between'
                marginTop={-2}
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

            </Box>


            <div style={{ marginTop: '5rem' }}>

                <Typography className={classes.header} variant='h5'>Top Selling Products</Typography>

                <HorizontalProductsView products={topProducts} />

            </div>

        </>
    </StorePage>;
}
