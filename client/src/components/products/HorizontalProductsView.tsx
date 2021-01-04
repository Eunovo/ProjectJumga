import React from 'react';
import clsx from 'clsx';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import ArrowRight from '@material-ui/icons/ChevronRight';
import { Product } from '../../models';
import { useProductStyles } from './styles';
import { ProductCard } from './ProductCard';

type Keys = "name" | "image" | "url";
interface HorizontalProductsViewProps {
    className?: string;
    products: Pick<Product, Keys>[];
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
            arrowLeft={<IconButton className={classes.arrow}><ArrowLeft /></IconButton>}
            arrowRight={<IconButton className={classes.arrow}><ArrowRight /></IconButton>}
            data={productsView}
        />
    </div>
}
