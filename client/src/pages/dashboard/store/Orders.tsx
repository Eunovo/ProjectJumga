import React, { useState } from 'react';
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
import { Order, OrderStatus } from '../../../models';
import { useStyles } from "../styles";
import { StorePage } from "./StorePage";
import { HorizontalOptionButtons } from '../../../components/forms';

type Keys = "_id" | "customerName" | "amountSold" | "status" | "createdAt";
const orders: Pick<Order, Keys>[] = [
    {
        _id: '1',
        customerName: 'Novo Bob',
        amountSold: 1000,
        status: OrderStatus.pending,
        createdAt: new Date()
    }
];

export const StoreOrders = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState('all');

    const statuses = ['all'].concat(Object.values(OrderStatus));

    return <StorePage selected='orders'>
        <>
            <Typography className={classes.header} variant='h4'>Orders</Typography>

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

            <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Customer Name</StyledTableCell>
                            <StyledTableCell align="right">($) Amount</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Created At</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders.map((order, i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                    {order.customerName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{order.amountSold}</StyledTableCell>
                                <StyledTableCell align="right">{order.status}</StyledTableCell>
                                <StyledTableCell align="right">{order.createdAt.toDateString()}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    </StorePage>
}
