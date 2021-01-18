import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import { Field, SpinnerButton } from '../../../components/forms';
import { useLogin } from '../../../hooks/users';
import { AuthPage } from "../AuthPage";
import { useStyles } from '../styles';


const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});

interface LoginProps {
    userType: 'user' | 'rider' | 'seller' | 'admin';
}

export const Login: React.FC<LoginProps> = ({ userType }) => {
    const classes = useStyles();
    const { error, login, loading } = useLogin();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from') || '';

    let signUpRoute = undefined;
    signUpRoute = userType === 'seller' && `/signup/store?from=${from}`;
    signUpRoute = userType === 'user' && `/signup?from=${from}` ;

    return <AuthPage>

        <Typography variant='h5'>Login</Typography>

        {error?.message && <Box marginTop={2}>
            <Alert severity='error'>{error.message}</Alert>
        </Box>}

        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                try {
                    await login(values, from);
                } catch (error) {
                    console.log(error);
                    actions.setErrors(error?.errors);
                }
            }}
        >

            <Form className={classes.authForm}>
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

                <SpinnerButton
                    className={classes.submitBtn}
                    type='submit'
                    color='primary'
                    variant='contained'
                    loading={loading}
                >
                    login
                </SpinnerButton>
            </Form>

        </Formik>

        <Box
            display={signUpRoute ? 'block' : 'hidden'}
            marginY={3}
        >
            <span>Don't ave an account?</span>{" "}
            <Link to={signUpRoute || ''}>Signup</Link>
        </Box>

    </AuthPage>
}
