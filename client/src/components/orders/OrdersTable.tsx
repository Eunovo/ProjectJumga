import {
    Paper,
    Table,
    TableBody,
    TableContainer
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useGetOrders } from "../../hooks/orders";
import { Order, OrderStatus } from '../../models';
import { FieldSelector } from '../../utils';
import { Amount } from "../Utils";
import { FieldsTableHead, FieldsTableRow } from '../table';

interface OrdersTableProps {
    classes?: {
        table?: string
    }
    fields: FieldSelector<Order>;
    type: "rider" | "store";

    /**
     * The rider's userId
     */
    rider?: string;

    /**
     * The store's name
     */
    store?: string;

    status?: OrderStatus;
}


export const OrdersTable: React.FC<OrdersTableProps> = ({
    classes,
    fields,
    type,
    ...params
}) => {
    const { data, loading } = useGetOrders(type, params);
    const orders = data?.orders || [];

    const fieldsMap = {
        code: {
            tilte: 'Order No.',
            render: (code: string) => <Link to={`/dashboard/order/${code}`}>{code}</Link>
        },
        customer: {
            component: "th",
            scope: "row",
            title: 'Customer Name',
            render: (value: any) => value.name
        },
        amountSold: {
            align: 'right',
            title: '($) Amount',
            render: (amount: number) => <Amount amount={amount} currency='USD' />
        },
        status: {
            align: 'right',
            title: 'status'
        },
        createdAt: {
            align: 'right',
            title: 'Created At',
            render: (value: string) => new Date(value).toDateString()
        }
    }

    let View = orders.map((order: any, i: number) => (
        <FieldsTableRow
            key={i} row={order}
            fields={fields}
            fieldsMap={fieldsMap}
        />
    ));
    if (loading) {
        View = [];
        for (let i = 0; i < 5; i++) {
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
