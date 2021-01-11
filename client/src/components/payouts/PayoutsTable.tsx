import {
    Paper,
    Table,
    TableBody,
    TableContainer
} from "@material-ui/core";
import { useGetPayouts } from "../../hooks/index.";
import { Payout } from '../../models';
import { FieldSelector } from '../../utils';
import { FieldsTableHead, FieldsTableRow } from '../table';

interface PayoutsTableProps {
    classes?: {
        table?: string
    }
    fields: FieldSelector<Payout>;
    user?: string;
}


export const PayoutsTable: React.FC<PayoutsTableProps> = ({
    classes, fields, ...params
}) => {
    const { data, loading } = useGetPayouts(params);
    const payouts = data?.payouts || [];

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

    let View = payouts.map((payout: any, i: number) => (
        <FieldsTableRow
            key={i} row={payout}
            fields={fields}
            fieldsMap={fieldsMap}
        />
    ));
    if (loading) {
        View = [];
        for (let i = 0; i < 10; i++) {
            View.push(<FieldsTableRow
                key={i}
                fields={fields}
                fieldsMap={fieldsMap}
                placeholder
            />)
        }
    }

    return <>
        <TableContainer component={Paper}>
            <Table className={classes?.table} aria-label="customized table">
                <FieldsTableHead fields={fields} fieldsMap={fieldsMap} />

                <TableBody>
                    {View}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
