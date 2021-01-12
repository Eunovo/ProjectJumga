import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import { TabPanelProps, TabPanel } from "./common";
import { Payable } from '../../../models';
import { Field, SelectBank, useFormStyles } from '../../../components/forms';


interface AccountTabProps extends Pick<TabPanelProps, "index"> {
    user: Payable
}

const accountNumberRegex = /^0[0-9]{9}$/g

const validationSchema = yup.object({
    accountName: yup.string().required(),
    accountNumber: yup.string()
        .matches(accountNumberRegex, "Account Number must contain 10 digits and start with a '0'")
        .required(),
    bank: yup.string().required()
});


export const AccountTab: React.FC<AccountTabProps> = ({ user, index }) => {
    const formClasses = useFormStyles();
    const initialValues = user;

    return <TabPanel index={index}>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {

            }}
        >
            <Form className={formClasses.form}>
                <Field
                    className={formClasses.field}
                    name='accountName'
                    label='Account Name'
                />

                <Field
                    className={formClasses.field}
                    name='accountNumber'
                    label='Account Number'
                />

                <SelectBank
                    className={formClasses.field}
                    name='bank'
                    label='Bank'
                />

                <Button
                    className={formClasses.submitBtn}
                    color='primary'
                    type='submit'
                    variant='contained'
                >Submit</Button>
            </Form>
        </Formik>
    </TabPanel>
}
