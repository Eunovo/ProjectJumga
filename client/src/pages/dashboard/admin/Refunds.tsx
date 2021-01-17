import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { FieldsTableHead, FieldsTableRow } from '../../../components/table';
import { useStyles } from '../styles';
import { AdminPage } from './AdminPage';
import { HorizontalOptionButtons } from '../../../components/forms';
import { useGetRefunds } from '../../../hooks';
import { RefundStatus } from '../../../models';


export const Refunds = () => {
    const classes = useStyles();
    const history = useHistory();
    const [selected, setSelected] = useState('all');

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
            render: (value: Date) => value?.toDateString() || ''
        }
    }

    const fields = Object.keys(fieldsMap).reduce(
        (prev: any, cur: string) => ({ ...prev, [cur]: true }), {});

    let View = refunds.map((refund: any, i: number) => (
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
