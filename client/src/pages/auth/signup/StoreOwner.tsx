import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Field } from '../../../components/forms';
import { AuthPage } from '../AuthPage';
import { useStyles } from '../styles';

// TODO countries?

const validationSchema = yup.object({
    firstName: yup.string().required().min(3).max(50),
    lastName: yup.string().required().min(3).max(50),
    email: yup.string().email().required(),
    storeName: yup.string().required().min(3).max(20),
    password: yup.string().required().min(8).max(20),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required()
});

export const StoreOwnerSignup = () => {
    const classes = useStyles();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        storeName: '',
        password: '',
        confirmPassword: '',
        country: '',
        state: '',
        city: '',
        street: ''
    };

    return <AuthPage>

        <Typography variant='h5'>
            Signup
        </Typography>
        <Typography variant='subtitle1'>
            As a Seller
        </Typography>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {

            }}
        >
            <Form className={classes.authForm}>
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
                    <Typography variant='h5'>Address</Typography>
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

                <Button
                    className={classes.submitBtn}
                    color='primary'
                    variant='contained'
                    type='submit'
                >
                    Signup
                </Button>
            </Form>
        </Formik>
    </AuthPage>
}
