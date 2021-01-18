import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { FieldsTableHead, FieldsTableRow } from '../../../components/table';
import { useStyles } from '../styles';
import { AdminPage } from './AdminPage';
import {
    HorizontalOptionButtons,
    SpinnerButton
} from '../../../components/forms';
import { useGetRefunds, useRefundAction } from '../../../hooks';
import { RefundStatus } from '../../../models';


export const Refunds = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState('all');
    const [updates, setUpdates] = useState<any>({});

    const statuses = ['all'].concat(Object.values(RefundStatus));
    const currrentStatus = (selected === 'all' ? undefined : selected) as RefundStatus;

    const { data, loading } = useGetRefunds({ status: currrentStatus });
    const refunds = data?.refunds || [];

    const fieldsMap = {
        order: {
            component: "th",
            scope: "row",
            title: 'Order'
        },
        status: {
            align: 'center',
            title: 'Status'
        },
        createdAt: {
            align: 'right',
            title: 'Created At',
            render: (value: string) => new Date(value).toDateString()
        },
        actions: {
            align: 'center',
            title: 'Actions',
            render: (_: any, row: any) => row.status === RefundStatus.pending ?
                <RefundActions
                    id={row._id}
                    onSuccess={(status: string) =>
                        setUpdates((u: any) => ({ ...u, [row._id]: { status } }))
                    }
                /> : <></>
        }
    }

    let fields = Object.keys(fieldsMap).reduce(
        (prev: any, cur: string) => (
            { ...prev, [cur]: true }),
        {}
    );
    fields = { ...fields, actions: true };

    let View = refunds
        .map((refund: any) => {
            if (updates[refund._id])
                return { ...refund, ...updates[refund._id] };
            return refund;
        })
        .map((refund: any, i: number) => (
            <FieldsTableRow
                key={i} row={refund}
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

    return <AdminPage selected='refunds'>

        <Box
            className={classes.header}
            display='flex'
            alignItems='center'
        >
            <Typography variant='h4'>Refunds</Typography>
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
            <TableContainer component={Paper}>
                <Table className={classes?.table} aria-label="customized table">
                    <FieldsTableHead fields={fields} fieldsMap={fieldsMap} />

                    <TableBody>
                        {View}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    </AdminPage>
}


const RefundActions: React.FC<{ id: string, onSuccess: (status: string) => void }> =
    ({ id, onSuccess }) => {
        const { execute: accept, loading: accepting } =
            useRefundAction(id, 'accept');
        const { execute: decline, loading: declining } =
            useRefundAction(id, 'decline');

        const handleSuccess = (operation: () => Promise<any>, status: string) => {
            return async () => {
                try {
                    await operation();
                    onSuccess(status)
                } catch (error) { }
            }
        }

        return <Box display='flex' alignItems='center' justifyContent='center'>

            <SpinnerButton
                onClick={handleSuccess(decline, RefundStatus.declined)}
                loading={declining}
                variant='contained'
                size='small'
                disabled={(accepting || declining)}
            >
                decline
        </SpinnerButton>

            <Box marginX={1}></Box>

            <SpinnerButton
                onClick={handleSuccess(accept, RefundStatus.accepted)}
                loading={accepting}
                color='primary'
                variant='contained'
                size='small'
                disabled={(accepting || declining)}
            >
                accept
        </SpinnerButton>

        </Box>
    } 
