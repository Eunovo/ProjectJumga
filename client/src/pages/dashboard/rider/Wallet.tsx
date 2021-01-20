import { useState } from "react";
import {
    Box,
    Paper,
    Typography
} from "@material-ui/core";
import { Amount } from '../../../components/Utils';
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
import { RiderPage } from "./RiderPage";


export const RiderWallet = () => {
    const { user } = useCurrentUser();
    const withdrawProps = useWithdraw();
    const classes = useStyles();
    const [selected, setSelected] = useState('all');

    const statuses = ['all'].concat(Object.values(PayoutStatus));
    const currentStatus = (selected === 'all' ? undefined : selected) as PayoutStatus;

    return <RiderPage selected='wallet'>
        <>
            <Box className={classes.header} style={{
                display: 'flex', alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <Typography variant='h4'>Wallet</Typography>

                <WithdrawButton {...withdrawProps} style={{ marginLeft: '1rem' }} />
            </Box>

            <Box marginBottom={4}>
                <Paper variant='outlined' style={{
                    marginInline: 'auto',
                    maxWidth: '60rem'
                }}>
                    <Box
                        display='flex'
                        flexDirection='column'
                        padding={2}
                    >
                        <Typography variant='caption'>Balance</Typography>
                        <Typography variant='inherit' style={{ fontSize: '3rem' }}>
                            <Amount amount={user.wallet} currency='USD' sign />
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            <Box marginBottom={2}>
                <Typography variant='h6'>Withdrawals</Typography>
            </Box>

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
    </RiderPage>
}
