import {
    Paper,
    Table,
    TableBody,
    TableContainer
} from "@material-ui/core";
import { useGetPayouts } from "../../hooks";
import { Payout } from '../../models';
import { FieldSelector } from '../../utils';
import { Amount } from "../Utils";
import { FieldsTableHead, FieldsTableRow } from '../table';


interface PayoutsTableProps extends Partial<Pick<Payout, "status">> {
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
        amount: {
            align: 'right',
            title: '($) Amount',
            render: (amount: number) => <Amount amount={amount} currency='USD' />
        },
        createdAt: {
            align: 'right',
            title: 'Created At',
            render: (value: string) => new Date(value).toDateString()
        },
        status: {
            align: 'center',
            title: 'Status'
        },
        paidOn: {
            align: 'right',
            title: 'Paid On',
            render: (value: Date) => value?.toDateString() || ''
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
