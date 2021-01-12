import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
    CountryProvider,
    Field,
    SelectCountry,
    SelectState,
    useFormStyles
} from '../../components/forms';


export interface CheckoutForm {
    fullName: string,
    email: string,
    deliveryCountry: string,
    deliveryState: string,
    deliveryCity: string,
    deliveryStreet: string
}

const validationSchema = yup.object({
    fullName: yup.string().max(100).required(),
    email: yup.string().email().required(),
    deliveryCountry: yup.string().required(),
    deliveryState: yup.string().required(),
    deliveryCity: yup.string().required(),
    deliveryStreet: yup.string().required()
});

interface BuyerFormProps {
    values?: CheckoutForm
    onSubmit: (form: CheckoutForm) => void
}

export const BuyerForm: React.FC<BuyerFormProps> = ({ values, onSubmit }) => {
    const history = useHistory();
    const form = useFormStyles();
    const initialValues: CheckoutForm = values || {
        fullName: '',
        email: '',
        deliveryCountry: '',
        deliveryState: '',
        deliveryCity: '',
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
            {
                ({ values }) => (
                    <Form className={form.form}>

                        <Field
                            className={form.field}
                            name='fullName'
                            label='Full Name'
                        />

                        <Field
                            className={form.field}
                            name='email'
                            label='Email'
                        />

                        <Box marginY={2}>
                            <Typography variant='h6'>Delivery Address</Typography>
                        </Box>

                        <CountryProvider>
                            <SelectCountry
                                className={form.field}
                                name='deliveryCountry'
                                label='Delivery Country'
                            />
                            <SelectState
                                className={form.field}
                                name='deliveryState'
                                label='Delivery State'
                                selectedCountry={values.deliveryCountry}
                            />
                        </CountryProvider>

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
                            submit</Button>

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
                                back to cart</Button>
                        </Box>

                    </Form>
                )
            }
        </Formik>
    </>
}
