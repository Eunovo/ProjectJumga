import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import { TabPanelProps, TabPanel } from "./common";
import { User } from '../../../models';
import {
    Field,
    SelectBank,
    SelectBankBranch,
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
        accountName: account?.name || '',
        accountNumber: account?.number || '',
        bank: account?.bank || '',
        bankId: account?.bankId || '',
        bankCode: account?.bankCode || '',
        branchId: account?.branchId || '',
        branch: account?.branchName || '',
        branchCode: account?.branchCode || '',
        branchBic: account?.branchBic || '',
        branchSwiftCode: account?.swiftCode || ''
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
                            bankCode: values.bankCode,
                            bankId: values.bankId,
                            branchId: values.branchId,
                            branchName: values.branch,
                            branchCode: values.branchCode,
                            branchBic: values.branchBic,
                            swiftCode: values.branchSwiftCode
                        }
                    }, { email: user.email });
                } catch (error) {
                    actions.setErrors(error?.errors);
                }
            }}
        >
            {
                ({  values }) => (
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

                        <SelectBankBranch
                            className={formClasses.field}
                            name='branch'
                            label='Branch'
                            bankId={values.bankId}
                        />

                        <SpinnerButton
                            className={formClasses.submitBtn}
                            color='primary'
                            type='submit'
                            variant='contained'
                            loading={loading}
                        >Submit</SpinnerButton>
                    </Form>
                )
            }
        </Formik>
    </TabPanel>
}
