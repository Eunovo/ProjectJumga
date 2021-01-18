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
import { useCurrentUser } from '../../../state/AppState';


export const StoreOrders = () => {
    const { user } = useCurrentUser();
    const classes = useStyles();
    const [selected, setSelected] = useState('all');

    const statuses = ['all'].concat(Object.values(OrderStatus));
    const currrentStatus = (selected === 'all' ? undefined : selected) as OrderStatus;

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
                        customer: true,
                        amountSold: true,
                        status: true,
                        createdAt: true
                    }}
                    type='store'
                    store={user.seller.storeName}
                    status={currrentStatus}
                />
            </Box>

        </>
    </StorePage>
}
