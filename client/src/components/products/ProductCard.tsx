import React from 'react';
import clsx from 'clsx';
import { Product } from '../../models';
import { useProductStyles } from './styles';


interface ProductCardProps {
    className?: string,
    product: Partial<Product>
}

export const ProductCard: React.FC<ProductCardProps> = ({ className, product }) => {
    const classes = useProductStyles();
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
    </div>
}
