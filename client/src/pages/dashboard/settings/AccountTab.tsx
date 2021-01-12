import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import { TabPanelProps, TabPanel } from "./common";
import { User } from '../../../models';
import {
    Field,
    SelectBank,
    SpinnerButton,
    useFormStyles
} from '../../../components/forms';
import { useUpdateUser } from '../../../hooks/users';


interface AccountTabProps extends Pick<TabPanelProps, "index"> {
    user: User;
    account: any;
}

const accountNumberRegex = /^0[0-9]{9}$/g

const validationSchema = yup.object({
    accountName: yup.string().required(),
    accountNumber: yup.string()
        .matches(accountNumberRegex, "Account Number must contain 10 digits and start with a '0'")
        .required(),
    bank: yup.string().required()
});


export const AccountTab: React.FC<AccountTabProps> = ({ account, user, index }) => {
    const { updateUser, loading, error } = useUpdateUser();
    const formClasses = useFormStyles();
    const initialValues = {
        accountName: account.name,
        accountNumber: account.accountNumber,
        bank: account.bank,
        bankCode: ''
    };

    return <TabPanel index={index}>
        {error?.message && <Box marginTop={2}>
            <Alert severity='error'>{error.message}</Alert>
        </Box>}

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                try {
                    await updateUser({
                        account: {
                            name: values.accountName,
                            number: values.accountNumber,
                            bank: values.bank,
                            bankCode: values.bankCode
                        }
                    }, { email: user.email });
                } catch (error) {
                    actions.setErrors(error?.errors);
                }
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
                    country={user.address.country}
                />

                <SpinnerButton
                    className={formClasses.submitBtn}
                    color='primary'
                    type='submit'
                    variant='contained'
                    loading={loading}
                >Submit</SpinnerButton>
            </Form>
        </Formik>
    </TabPanel>
}
