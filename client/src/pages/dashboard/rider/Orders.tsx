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
import { RiderPage } from "./RiderPage";
import { HorizontalOptionButtons } from '../../../components/forms';
import { useCurrentUser } from '../../../state/AppState';


export const RiderOrders = () => {
    const { user } = useCurrentUser();
    const classes = useStyles();
    const [selected, setSelected] = useState('all');

    const statuses = ['all'].concat(Object.values(OrderStatus));
    const currrentStatus = (selected === 'all' ? undefined : selected) as OrderStatus;

    return <RiderPage selected='orders'>
        <>
            <Typography className={classes.header} variant='h4'>Orders</Typography>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <HorizontalOptionButtons
                    options={statuses}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>

            <Box marginTop={4} className={classes.table}>
                <OrdersTable
                    classes={classes}
                    fields={{
                        code: true,
                        customer: true,
                        status: true,
                        createdAt: true
                    }}
                    type='rider'
                    rider={user._id}
                    status={currrentStatus}
                />
            </Box>

        </>
    </RiderPage>
}
