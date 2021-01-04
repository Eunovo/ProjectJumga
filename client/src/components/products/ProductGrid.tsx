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
}

export const ProductGrid: React.FC<ProductGridProps> = ({ className, products, allowAddToCart }) => {
    const classes = useProductStyles();
    
    return <div className={clsx(classes.grid, className)}>
        {
            products.map((product, i) => (
                <ProductCard key={i} product={product} addToCart={allowAddToCart} />
            ))
        }
    </div>
}
