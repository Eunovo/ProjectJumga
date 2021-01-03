import React from 'react';
import clsx from 'clsx';
import { Product } from '../../models';
import { useProductStyles } from './styles';
import { ProductCard } from './ProductCard';


interface ProductGridProps {
    className?: string
    products: Partial<Product>[]
}

export const ProductGrid: React.FC<ProductGridProps> = ({ className, products }) => {
    const classes = useProductStyles();
    
    return <div className={clsx(classes.grid, className)}>
        {
            products.map((product, i) => (
                <ProductCard key={i} product={product} />
            ))
        }
    </div>
}
