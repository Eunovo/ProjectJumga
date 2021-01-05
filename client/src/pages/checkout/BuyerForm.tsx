import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Field, useFormStyles } from '../../components/forms';


interface CheckoutForm {
    fullName: string,
    deliveryCountry: string,
    deliveryState: string,
    deliveryCity: string,
    deliveryStreet: string
}

const validationSchema = yup.object({
    fullName: yup.string().max(100).required(),
    deliveryCountry: yup.string().required(),
    deliveryState: yup.string().required(),
    deliveryCity: yup.string().required(),
    deliveryStreet: yup.string().required()
});

interface BuyerFormProps {
    onSubmit: (form: CheckoutForm) => void
}

export const BuyerForm: React.FC<BuyerFormProps> = ({ onSubmit }) => {
    const history = useHistory();
    const form = useFormStyles();
    const initialValues: CheckoutForm = {
        fullName: '', deliveryCountry: '',
        deliveryState: '', deliveryCity: '',
        deliveryStreet: ''
    };


    return <>
        <Box marginY={6}>
            <Typography variant='h4'>Checkout</Typography>
        </Box>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                onSubmit(values);
            }}
        >
            <Form className={form.form}>

                <Field
                    className={form.field}
                    name='fullName'
                    label='Full Name'
                />

                <Box marginY={2}>
                    <Typography variant='h6'>Delivery Address</Typography>
                </Box>

                <Field
                    className={form.field}
                    name='deliveryCountry'
                    label='Delivery Country'
                />

                <Field
                    className={form.field}
                    name='deliveryState'
                    label='Delivery State'
                />

                <Field
                    className={form.field}
                    name='deliveryCity'
                    label='Delivery City'
                />

                <Field
                    className={form.field}
                    name='deliveryStreet'
                    label='Delivery Street'
                />

                <Button
                    className={form.submitBtn}
                    color='primary'
                    type='submit'
                    variant='contained'
                >
                    submit
                </Button>

                <Box
                    marginY={2}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Button
                        onClick={() => history.push('/cart')}
                        type='button'
                    >
                        back to cart
                    </Button>
                </Box>

            </Form>
        </Formik>
    </>
}
