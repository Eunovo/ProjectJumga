import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Formik, Form } from 'formik';
import { Field, useFormStyles, SpinnerButton } from '../../../components/forms';
import { useStyles } from '../styles';
import { AdminPage } from './AdminPage';
import { useAddUser } from '../../../hooks';


export const AddRider = () => {
    const classes = useStyles();
    const { addUser, loading, error } = useAddUser();

    return <AdminPage selected='riders'>

        <Typography className={classes.header} variant='h4'>
            Add Rider
        </Typography>

        {error?.message && <Box marginTop={2}>
            <Alert severity='error'>{error.message}</Alert>
        </Box>}

        <RiderForm
            loading={loading}
            onSubmit={async (values: any) => {
                await addUser({ ...values, role: 'rider' });
            }}
        />

    </AdminPage>
}

const validationSchema = yup.object({
    firstName: yup.string().required().min(3).max(50),
    lastName: yup.string().required().min(3).max(50),
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(20),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required()
});

interface RiderFormProps {
    loading: boolean
    onSubmit: (values: any) => Promise<void>
}

const RiderForm: React.FC<RiderFormProps> =
    ({ loading, onSubmit }) => {
        const classes = useFormStyles();
        const initialValues = {
            firstName: '', lastName: '',
            email: '', password: '',
            confirmPassword: '', country: '',
            state: '', city: '', street: ''
        };

        return <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                try {
                    await onSubmit(values);
                } catch (error) {
                    actions.setErrors(error?.errors)
                }
            }}
        >
            <Form className={classes.form}>
                <Field
                    className={classes.field}
                    name='firstName'
                    label='First Name'
                />
                <Field
                    className={classes.field}
                    name='lastName'
                    label='Last Name'
                />
                <Field
                    className={classes.field}
                    name='email'
                    label='Email'
                    placeholder='test@gmail.com'
                />
                <Field
                    className={classes.field}
                    name='storeName'
                    label='Store Name'
                    helperText='Your store name cannot be changed'
                />
                <Field
                    className={classes.field}
                    name='password'
                    label='Password'
                    type='password'
                />
                <Field
                    className={classes.field}
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                />

                <Box marginTop={2}>
                    <Typography variant='h6'>Address</Typography>
                </Box>

                <Field
                    className={classes.field}
                    name='country'
                    label='Country'
                />
                <Field
                    className={classes.field}
                    name='state'
                    label='State'
                />
                <Field
                    className={classes.field}
                    name='city'
                    label='City'
                />
                <Field
                    className={classes.field}
                    name='street'
                    label='Street'
                />

                <SpinnerButton
                    className={classes.submitBtn}
                    color='primary'
                    variant='contained'
                    type='submit'
                    loading={loading}
                >
                    create rider
                </SpinnerButton>
            </Form>
        </Formik>
    }
