import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import {
    CountryProvider,
    Field,
    SelectCountry,
    SelectState,
    SpinnerButton
} from '../../../components/forms';
import { useSignup } from '../../../hooks/users';
import { AuthPage } from '../AuthPage';
import { useStyles } from '../styles';


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

export const CustomerSignup = () => {
    const classes = useStyles();
    const { signup, loading, error } = useSignup();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from') || '';

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
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
            Create an Account
        </Typography>

        {error?.message && <Box marginTop={2}>
            <Alert severity='error'>{error.message}</Alert>
        </Box>}

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                const { country, state, city, street, ...rest } = values;
                try {
                    await signup({
                        ...rest,
                        role: 'user',
                        address: {
                            country,
                            state,
                            city,
                            street
                        }
                    }, from);
                } catch (error) {
                    actions.setErrors(error?.errors);
                }
            }}
        >
            {
                ({ values }) => (
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

                        <CountryProvider>
                            <SelectCountry
                                className={classes.field}
                                name='country'
                                label='Country'
                            />
                            <SelectState
                                className={classes.field}
                                name='state'
                                label='State'
                                selectedCountry={values.country}
                            />
                        </CountryProvider>

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
                            type='submit'
                            color='primary'
                            variant='contained'
                            loading={loading}
                        >
                            signup</SpinnerButton>
                    </Form>
                )
            }
        </Formik>

        <Box marginY={3}>
            <span>Already have an account?</span>{" "}
            <Link to='/login'>Login</Link>
        </Box>

    </AuthPage>
}
