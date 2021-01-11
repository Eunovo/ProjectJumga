import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core';
import { Product } from '../../models';
import { useProductStyles } from './styles';
import { useCart } from '../../hooks/cart';


type Keys = "name" | "image" | "url";
interface ProductCardProps {
    className?: string,
    /**
     * The product to display.
     * If product is not set, the card
     * becomes a Skeleton
     */
    product?: Pick<Product, Keys> & Partial<Pick<Product, "price">>,
    addToCart?: boolean
}

const ImageSkeleton = withStyles({
    root: {
        height: '100%',
        transform: 'none'
    }
})(Skeleton);

const HalfSkeleton = withStyles({
    root: {
        width: '75%'
    }
})(Skeleton);

const PriceSkeleton = withStyles({
    root: {
        width: '40%'
    }
})(Skeleton);

const ButtonSkeleton = withStyles({
    root: {
        width: '75%',
        marginInline: 'auto',
        transform: 'none'
    }
})(Skeleton);

export const ProductCard: React.FC<ProductCardProps> = ({
    className,
    product,
    addToCart
}) => {
    const classes = useProductStyles();
    const { increment } = useCart();
    const { name, image, price } = product || {};

    return <div className={clsx(classes.product, className)}>
        <div className={classes.image}>
            {
                image ?
                    <img
                        src={`${process.env.REACT_APP_API_URL}/files/${image}`}
                        alt={name}
                    />
                    : <ImageSkeleton />
            }
        </div>

        <div className={classes.name}>
            {
                name ? name : <>
                    <Skeleton />
                    <HalfSkeleton />
                </>
            }
        </div>

        <div className={classes.price}>
            {
                price !== undefined ? `$ ${price}`
                    : <PriceSkeleton />
            }
        </div>

        {
            addToCart &&
            (
                (increment && price !== undefined) ?
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => increment(product as Product, 1)}
                    >
                        add to cart</Button>
                    : <ButtonSkeleton />
            )
        }
    </div>
}
