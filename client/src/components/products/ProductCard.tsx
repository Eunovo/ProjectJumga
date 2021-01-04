import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { Product } from '../../models';
import { useProductStyles } from './styles';
import { useCart } from '../../hooks/cart';


type Keys = "name" | "image" | "url";
interface ProductCardProps {
    className?: string,
    product: Pick<Product, Keys> & Partial<Pick<Product, "price">>,
    addToCart?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({ className, product, addToCart }) => {
    const classes = useProductStyles();
    const { increment } = useCart();
    const { name, image, price } = product;

    return <div className={clsx(classes.product, className)}>
        <div className={classes.image}>
            <img src={image} alt={name} />
        </div>

        <div className={classes.name}>
            {name || ''}
        </div>

        <div className={classes.price}>
            {price !== undefined && `$ ${price}`}
        </div>

        {
            addToCart && increment && product.price !== undefined && <Button
                color='primary'
                variant='contained'
                onClick={() => increment(product as Product, 1)}
            >
                add to cart
            </Button>
        }
    </div>
}
