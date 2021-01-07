import * as yup from 'yup';
import { Typography, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import { Field, useFormStyles } from '../../../components/forms';
import { User } from '../../../models';
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {

            }}
        >
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
                />

                <Typography variant='h6' style={{ marginBlock: theme.spacing(2) }}>
                    Address
                </Typography>

                <Field
                    className={formClasses.field}
                    name='country'
                    label='Country'
                />

                <Field
                    className={formClasses.field}
                    name='state'
                    label='State'
                />

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

                <Button
                    className={formClasses.submitBtn}
                    color='primary'
                    variant='contained'
                    type='submit'
                >Submit</Button>
            </Form>
        </Formik>
    </TabPanel>
}
