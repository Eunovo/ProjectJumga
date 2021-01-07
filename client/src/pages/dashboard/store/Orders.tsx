import { useState } from 'react';
import {
    Box,
    Typography
} from "@material-ui/core";
import {
    OrdersTable
} from '../../../components/orders';
import { OrderStatus } from '../../../models';
import { useStyles } from "../styles";
import { StorePage } from "./StorePage";
import { HorizontalOptionButtons } from '../../../components/forms';


export const StoreOrders = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState('all');

    const statuses = ['all'].concat(Object.values(OrderStatus));

    return <StorePage selected='orders'>
        <>
            <Typography className={classes.header} variant='h4'>Orders</Typography>

            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <HorizontalOptionButtons
                    options={statuses}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>

            <Box marginTop={4}>
                <OrdersTable
                    classes={classes}
                    fields={{
                        customerName: true,
                        amountSold: true,
                        status: true,
                        createdAt: true
                    }}
                />
            </Box>

        </>
    </StorePage>
}
