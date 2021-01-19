import * as yup from "yup";
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik, Form } from "formik";
import { AmountField, Field, SpinnerButton, useFormStyles } from "../../../components/forms";
import { useGetCommissions, useUpdateCommissions } from "../../../hooks/commissions";
import { TabPanel, TabPanelProps } from "./common";

interface AppSettingsProps extends Pick<TabPanelProps, "index"> {
}

const validationSchema = yup.object({
    storeapproval: yup.string()
        .matches(
            /[0-9]*\.?[0-9]{0,2}/g,
            'Store Approval fee must be a number with no more than two decimal digits'
        )
        .test(
            'storeapproval',
            'Store Approval fee must be greater than 0',
            (value) => Number.parseFloat(value as string) > 0
        )
        .required(),
    purchase: yup.number().required(),
    delivery: yup.number().required(),
    deliveryFee: yup.string()
        .matches(
            /[0-9]*\.?[0-9]{0,2}/g,
            'Delivery must be a number with no more than two decimal digits'
        )
        .test(
            'deliveryFee',
            'Delivery Fee must be greater than 0',
            (value) => Number.parseFloat(value as string) > 0
        )
        .required()
});

export const AppSettings: React.FC<AppSettingsProps> = ({ index }) => {
    const { data, loading: fetching, error: fetchError } =
        useGetCommissions();
    const { updateCommissions, loading: saving, error: saveError } =
        useUpdateCommissions();

    const classes = useFormStyles();
    const initialValues = data?.commissions
        .reduce((prev: any, cur: any) =>
            ({ ...prev, [cur.key]: cur.value }), {}) || {
        storeapproval: '', purchase: '', delivery: '', deliveryFee: ''
    };

    const alert = (error: any) => (
        error && <Alert severity='error'>{error.message}</Alert>
    );

    return <TabPanel index={index}>

        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginY={3}
        >

            <Box>
                {alert(fetchError)}
                {alert(saveError)}
            </Box>

            {fetching && <CircularProgress />}

        </Box>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                try {
                    await updateCommissions(
                        Object.keys(values)
                            .map((key) => ({
                                key,
                                value: (values as any)[key]
                            }))
                    );
                } catch (error) {
                    actions.setErrors(error?.errors);
                }
            }}
        >
            <Form className={classes.form}>

                <AmountField
                    className={classes.field}
                    name='storeapproval'
                    label='($) Store Approval Fee'
                    disabled={fetching || fetchError}
                    helperText='All stores must pay this one-time fee after registration'
                />

                <Field
                    className={classes.field}
                    name='purchase'
                    label='% Purchase Commission'
                    placeholder='10.0'
                    disabled={fetching || fetchError}
                />

                <AmountField
                    className={classes.field}
                    name='deliveryFee'
                    label='($) Delivery Fee'
                    disabled={fetching || fetchError}
                    helperText='This is the price for the delivery one item'
                />

                <Field
                    className={classes.field}
                    name='delivery'
                    label='% Delivery Commission'
                    placeholder='10.0'
                    disabled={fetching || fetchError}
                />

                <SpinnerButton
                    className={classes.submitBtn}
                    type='submit'
                    loading={saving}
                    variant='contained'
                    color='primary'
                >
                    Save
                </SpinnerButton>

            </Form>
        </Formik>
    </TabPanel>
}
