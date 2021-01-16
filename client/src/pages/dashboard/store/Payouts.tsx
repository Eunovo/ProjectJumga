import {
    Box,
    Typography
} from "@material-ui/core";
import { useState } from "react";
import { HorizontalOptionButtons } from '../../../components/forms';
import {
    PayoutsTable,
    useWithdraw,
    WithdrawButton,
    WithdrawDialog
} from '../../../components/payouts';
import { PayoutStatus } from "../../../models";
import { useCurrentUser } from "../../../state/AppState";
import { useStyles } from "../styles";
import { StorePage } from "./StorePage";


export const StorePayouts = () => {
    const { user } = useCurrentUser();
    const withdrawProps = useWithdraw();
    const classes = useStyles();
    const [selected, setSelected] = useState('all');

    const statuses = ['all'].concat(Object.values(PayoutStatus));
    const currentStatus = (selected === 'all' ? undefined : selected) as PayoutStatus;

    return <StorePage selected='payouts'>
        <>
            <Box className={classes.header} style={{
                display: 'flex', alignItems: 'flex-end',
                flexWrap: 'wrap'
            }}>
                <Typography variant='h4'>Payouts</Typography>

                <WithdrawButton {...withdrawProps} style={{ marginLeft: '1rem' }} />
            </Box>

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
                <PayoutsTable
                    classes={classes}
                    fields={{
                        amount: true,
                        createdAt: true,
                        status: true,
                        paidOn: true
                    }}
                    user={user._id}
                    status={currentStatus}
                />
            </Box>

            <WithdrawDialog {...withdrawProps} />
        </>
    </StorePage>
}
