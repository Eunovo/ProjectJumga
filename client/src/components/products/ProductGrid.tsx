import React from 'react';
import clsx from 'clsx';
import { Product } from '../../models';
import { useProductStyles } from './styles';
import { ProductCard } from './ProductCard';

type Keys = "name" | "image" | "url";
interface ProductGridProps {
    className?: string
    products: Pick<Product, Keys>[]
    allowAddToCart?: boolean
    placeholder?: boolean
    placeholderLength?: number
}

export const ProductGrid: React.FC<ProductGridProps> = ({
    className,
    products,
    allowAddToCart,
    placeholder,
    placeholderLength
}) => {
    const classes = useProductStyles();

    let View = products.map((product, i) => (
        <ProductCard key={i} product={product} addToCart={allowAddToCart} />
    ));

    if (placeholder && placeholderLength && products.length === 0) {
        View = [];
        for (let i = 0; i < placeholderLength; i++) {
            View.push(<ProductCard key={i} addToCart={allowAddToCart} />)
        }
    }
    
    return <div className={clsx(classes.grid, className)}>
        {View}
    </div>
}


