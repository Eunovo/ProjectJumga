import React from 'react';
import clsx from 'clsx';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import ArrowRight from '@material-ui/icons/ChevronRight';
import { Product } from '../../models';
import { useProductStyles } from './styles';


interface HorizontalProductsViewProps {
    className?: string;
    products: Product[];
}

export const HorizontalProductsView: React.FC<HorizontalProductsViewProps> = ({ className, products }) => {
    const classes = useProductStyles();

    const productsView = products.map((product, index) => (
        <div key={index} className={classes.product}>
            <div className={classes.image}>
                <img src={product.image} alt={product.name} />
            </div>

            <div className={classes.name}>
                {product.name}
            </div>
        </div>
    ));

    return <div className={clsx(classes.slider, className)}>
        <ScrollMenu
            arrowLeft={<div className={classes.arrow}><ArrowLeft /></div>}
            arrowRight={<div className={classes.arrow}><ArrowRight /></div>}
            data={productsView}
        />
    </div>
}
