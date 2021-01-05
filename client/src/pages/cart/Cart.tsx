import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import IncrementIcon from '@material-ui/icons/Add';
import DecrementIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { CartItem, useCart } from '../../hooks/cart';
import { useCartStyles } from './styles';


export const Cart = () => {
    const history = useHistory();
    const classes = useCartStyles();
    const { cart } = useCart();

    const cartTotal = Object.values(cart)
        .reduce((prev, cur) => prev + (cur.quantity * cur.price), 0);

    return <>
        <Container>

            <Box marginY={6}>
                <Typography variant='h4'>Cart</Typography>
            </Box>

            <Grid container spacing={3}>
                {
                    Object.values(cart).map((product, i) =>
                        <Grid item xs={3} key={i}>
                            <CartItemCard product={product} />
                        </Grid>
                    )
                }
            </Grid>
        </Container>

        <div className={classes.bottomBar}>
            <Container className={clsx(classes.flex, classes.end)}>

                <Box marginRight={5}>
                    <Typography style={{ fontWeight: 'bold' }}>
                        Total Price: ${cartTotal}
                    </Typography>
                </Box>

                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => history.push('/checkout')}
                >
                    checkout
                </Button>

            </Container>
        </div>
    </>
}


interface CartItemProps {
    product: CartItem;
}

const CartItemCard: React.FC<CartItemProps> = ({ product }) => {
    const classes = useCartStyles();

    const { increment, decrement } = useCart();
    if (!increment || !decrement) return <></>;

    return <Card variant='outlined'>
        <Box padding={2}>
            <CardMedia
                component="img"
                alt={product.image}
                height="200"
                image={product.image}
                title={product.name}
            />

            <CardContent>
                <Box height='3rem' overflow={'hidden'}>
                    <Typography variant='body1'>
                        {product.name}
                    </Typography>
                </Box>
            </CardContent>

            <div className={classes.flex}>
                <Box width="8rem">
                    <Typography>Quantity</Typography>
                </Box>

                <div className={classes.grow}></div>

                <IconButton onClick={() => decrement(product, 1)}>
                    <DecrementIcon />
                </IconButton>

                <div className={classes.quantity}>
                    {product.quantity}
                </div>

                <IconButton onClick={() => increment(product, 1)}>
                    <IncrementIcon />
                </IconButton>
            </div>

            <div className={classes.flex}>
                <Box width="8rem">
                    <Typography>Price</Typography>
                </Box>

                <div className={classes.grow}></div>

                <Typography className={classes.price}>
                    ${product.price * product.quantity}
                </Typography>
            </div>

            <div className={clsx(classes.flex, classes.end)}>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </div>
        </Box>
    </Card>
}
