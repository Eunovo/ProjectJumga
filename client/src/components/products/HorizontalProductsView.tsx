import React from 'react';
import clsx from 'clsx';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import ArrowRight from '@material-ui/icons/ChevronRight';
import { Product } from '../../models';
import { useProductStyles } from './styles';
import { ProductCard } from './ProductCard';


interface HorizontalProductsViewProps {
    className?: string;
    products: Partial<Product>[];
}

export const HorizontalProductsView: React.FC<HorizontalProductsViewProps> = ({ className, products }) => {
    const classes = useProductStyles();

    const productsView = products.map((product, index) => (
        <ProductCard
            key={index}
            className={classes.sliderProduct}
            product={product}
        />
    ));

    return <div className={clsx(classes.slider, className)}>
        <ScrollMenu
            arrowLeft={<div className={classes.arrow}><ArrowLeft /></div>}
            arrowRight={<div className={classes.arrow}><ArrowRight /></div>}
            data={productsView}
        />
    </div>
}
