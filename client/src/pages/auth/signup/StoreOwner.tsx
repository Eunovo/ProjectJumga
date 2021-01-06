import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Field } from '../../../components/forms';
import { AuthPage } from '../AuthPage';
import { useStyles } from '../styles';

// TODO countries?
interface FormValues {
    firstName: string;
    lastName: string;
    storeName: string;
    password: string;
    confirmPassword: string;
}

const validationSchema = yup.object({
    firstName: yup.string().required().min(3).max(50),
    lastName: yup.string().required().min(3).max(50),
    storeName: yup.string().required().min(3).max(20),
    password: yup.string().required().min(8).max(20),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const StoreOwnerSignup = () => {
    const classes = useStyles();

    const initialValues: FormValues = {
        firstName: '',
        lastName: '',
        storeName: '',
        password: '',
        confirmPassword: ''
    };

    return <AuthPage>
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
