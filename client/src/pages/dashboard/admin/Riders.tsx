import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Rider } from '../../../models';
import { FieldsTableHead, FieldsTableRow } from '../../../components/table';
import { useStyles } from '../styles';
import { AdminPage } from './AdminPage';


const AddRiderButton = withStyles({
    root: {
        color: 'blue'
    }
})(Button);

type Keys = "firstName" | "lastName" | "email" | "address" | "createdAt"

const riders: Pick<Rider, Keys>[] = [
    {
        firstName: 'Novo', lastName: 'Bob',
        email: 'test@g.com',
        address: {
            country: 'Nigeria',
            state: 'Lagos',
            city: 'Lagos',
            street: 'Badmus Street'
        },
        createdAt: new Date()
    }
];

export const Riders = () => {
    const classes = useStyles();
    const history = useHistory();

    const fieldsMap = {
        firstName: {
            component: "th",
            scope: "row",
            title: 'First Name'
        },
        lastName: {
            component: "th",
            scope: "row",
            title: 'Last Name'
        },
        address: {
            title: 'Area of Operation',
            render: (address: any) => `${address.state}, ${address.country}`
        },
        createdAt: {
            align: 'right',
            title: 'Created At',
            render: (value: Date) => value.toDateString()
        }
    }

    const fields = Object.keys(fieldsMap).reduce(
        (prev: any, cur: string) => ({ ...prev, [cur]: true }), {});

    return <AdminPage selected='riders'>

        <Box
            className={classes.header}
            display='flex'
            alignItems='center'
        >
            <Box marginRight={2}>
                <Typography variant='h4'>Riders</Typography>
            </Box>

            <AddRiderButton
                onClick={() => history.push('/dashboard/riders/add')}
            >
                new
            </AddRiderButton>
        </Box>

        <Box marginTop={4}>
            <TableContainer component={Paper}>
                <Table className={classes?.table} aria-label="customized table">
                    <FieldsTableHead fields={fields} fieldsMap={fieldsMap} />

                    <TableBody>
                        {riders.map((rider, i) => (
                            <FieldsTableRow
                                key={i} row={rider}
                                fields={fields}
                                fieldsMap={fieldsMap}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    </AdminPage>
}
