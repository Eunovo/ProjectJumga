import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Field } from '../../../components/forms';
import { AuthPage } from "../AuthPage";
import { useStyles } from '../styles';


const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});

interface LoginProps {
    userType: 'rider' | 'seller' | 'admin';
}

export const Login: React.FC<LoginProps> = ({ userType }) => {
    const classes = useStyles();

    return <AuthPage>

        <Typography variant='h5'>Login</Typography>

        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {

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

                <Button
                    className={classes.submitBtn}
                    type='submit'
                    color='primary'
                    variant='contained'
                >
                    login
                </Button>
            </Form>

        </Formik>
    </AuthPage>
}
