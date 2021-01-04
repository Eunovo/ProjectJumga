import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {
    StyledTableCell,
    StyledTableRow
} from '../../../components/table';
import { Payout } from '../../../models';
import { useStyles } from "../styles";
import { StorePage } from "./StorePage";


const payouts: Payout[] = [
    {
        amount: 1000,
        earningPeriod: { from: new Date(), to: new Date() },
        paidOn: new Date()
    },
    {
        amount: 1000,
        earningPeriod: { from: new Date(), to: new Date() },
        paidOn: new Date()
    }
];

export const StorePayouts = () => {
    const classes = useStyles();

    return <StorePage selected='payouts'>
        <>
            <Typography className={classes.header} variant='h4'>Payouts</Typography>

            <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Earning Period</StyledTableCell>
                            <StyledTableCell align="right">($) Amount</StyledTableCell>
                            <StyledTableCell align="right">Paid On</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {payouts.map((payout, i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                    {payout.earningPeriod.from.toDateString()}
                                    {' '}to{' '}
                                    {payout.earningPeriod.to.toDateString()}
                                </StyledTableCell>
                                <StyledTableCell align="right">{payout.amount}</StyledTableCell>
                                <StyledTableCell align="right">{payout.paidOn.toDateString()}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    </StorePage>
}
