import {
    Box,
    Typography
} from "@material-ui/core";
import {
    PayoutsTable
} from '../../../components/payouts';
import { useStyles } from "../styles";
import { StorePage } from "./StorePage";


export const StorePayouts = () => {
    const classes = useStyles();

    return <StorePage selected='payouts'>
        <>
            <Typography className={classes.header} variant='h4'>Payouts</Typography>

            <Box marginTop={4}>
                <PayoutsTable
                    classes={classes}
                    fields={{
                        earningPeriod: true,
                        amount: true,
                        paidOn: true
                    }}    
                />
            </Box>

        </>
    </StorePage>
}
