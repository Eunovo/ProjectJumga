import * as yup from 'yup';
import { Box, Typography, useTheme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Formik, Form } from 'formik';
import {
    CountryProvider,
    Field,
    SelectCountry,
    SelectState,
    SpinnerButton,
    useFormStyles
} from '../../../components/forms';
import { User } from '../../../models';
import { useUpdateUser } from '../../../hooks/users';
import { TabPanelProps, TabPanel } from "./common";


interface UserTabProps extends Pick<TabPanelProps, "index"> {
    user: Omit<User, "createdAt">
}

const validationSchema = yup.object({
    firstName: yup.string()
        .required()
        .min(3)
        .max(50),
    lastName: yup.string()
        .required()
        .min(3)
        .max(50),
    email: yup.string().email().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required()
});


export const UserTab: React.FC<UserTabProps> = ({ user, index }) => {
    const { updateUser, loading, error } = useUpdateUser();
    const theme = useTheme();
    const formClasses = useFormStyles();
    const initialValues = {
        ...user,
        country: user.address.country,
        state: user.address.state,
        city: user.address.city,
        street: user.address.street
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
                    await updateUser(values, { email: user.email });
                } catch (error) {
                    actions.setErrors(error?.errors);
                }
            }}
        >
            {
                ({ values }) => (
                    <Form className={formClasses.form}>
                        <Field
                            className={formClasses.field}
                            name='firstName'
                            label='First Name'
                        />

                        <Field
                            className={formClasses.field}
                            name='lastName'
                            label='Last Name'
                        />

                        <Field
                            className={formClasses.field}
                            name='email'
                            label='Email'
                            helperText='This field is not editable'
                            disabled
                        />

                        <Typography variant='h6' style={{ marginBlock: theme.spacing(2) }}>
                            Address</Typography>

                        <CountryProvider>
                            <SelectCountry
                                className={formClasses.field}
                                name='country'
                                label='Country'
                            />
                            <SelectState
                                className={formClasses.field}
                                name='state'
                                label='State'
                                selectedCountry={values.country}
                            />
                        </CountryProvider>

                        <Field
                            className={formClasses.field}
                            name='city'
                            label='City'
                        />

                        <Field
                            className={formClasses.field}
                            name='street'
                            label='Street'
                        />

                        <SpinnerButton
                            className={formClasses.submitBtn}
                            color='primary'
                            variant='contained'
                            type='submit'
                            loading={loading}
                        >Submit</SpinnerButton>
                    </Form>
                )
            }
        </Formik>
    </TabPanel>
}
