import {
    Paper,
    Table,
    TableBody,
    TableContainer
} from "@material-ui/core";
import { Payout } from '../../models';
import { FieldSelector } from '../../utils';
import { FieldsTableHead, FieldsTableRow } from '../table';

interface PayoutsTableProps {
    classes?: {
        table?: string
    }
    fields: FieldSelector<Payout>;
}


const payouts: Partial<Payout>[] = [
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

export const PayoutsTable: React.FC<PayoutsTableProps> = ({ classes, fields }) => {
    const fieldsMap = {
        earningPeriod: {
            component: "th",
            scope: "row",
            title: 'Earning Period',
            render: ({ from, to }: any) => `${from.toDateString()} to ${to.toDateString()}`
        },
        amount: {
            align: 'right',
            title: '($) Amount'
        },
        paidOn: {
            align: 'right',
            title: 'Paid On',
            render: (value: Date) => value.toDateString()
        }
    }

    return <>
        <TableContainer component={Paper}>
            <Table className={classes?.table} aria-label="customized table">
                <FieldsTableHead fields={fields} fieldsMap={fieldsMap} />

                <TableBody>
                    {payouts.map((payout, i) => (
                        <FieldsTableRow
                            key={i} row={payout}
                            fields={fields}
                            fieldsMap={fieldsMap}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
