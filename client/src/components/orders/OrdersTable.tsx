import {
    Paper,
    Table,
    TableBody,
    TableContainer
} from "@material-ui/core";
import { Order, OrderStatus } from '../../models';
import { FieldSelector } from '../../utils';
import { FieldsTableHead, FieldsTableRow } from '../table';

interface OrdersTableProps {
    classes?: {
        table?: string
    }
    fields: FieldSelector<Order>;
}

const orders: Partial<Order>[] = [
    {
        _id: '1',
        customerName: 'Novo Bob',
        amountSold: 1000,
        status: OrderStatus.pending,
        createdAt: new Date()
    }
];

export const OrdersTable: React.FC<OrdersTableProps> = ({ classes, fields }) => {
    const fieldsMap = {
        customerName: {
            component: "th",
            scope: "row",
            title: 'Customer Name'
        },
        amountSold: {
            align: 'right',
            title: '($) Amount'
        },
        status: {
            align: 'right',
            title: 'status'
        },
        createdAt: {
            align: 'right',
            title: 'Created At',
            render: (value: Date) => value.toDateString()
        }
    }

    return <>
        <TableContainer component={Paper}>
            <Table className={classes?.table} aria-label="customized table">
                <FieldsTableHead fields={fields} fieldsMap={fieldsMap} />

                <TableBody>
                    {orders.map((order, i) => (
                        <FieldsTableRow
                            key={i} row={order}
                            fields={fields}
                            fieldsMap={fieldsMap}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
