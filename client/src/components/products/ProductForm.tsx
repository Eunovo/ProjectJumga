import React from 'react';
import clsx from 'clsx';
import * as yup from 'yup';
import ImageUploader from 'react-images-upload';
import { Box, Typography } from '@material-ui/core';
import { Formik, Form, FormikHelpers, useField } from 'formik';
import { Field, SpinnerButton, useFormStyles } from '../forms';

interface ProductFormValues {
    name: string
    url: string
    price: string
    images: (File | string)[]
    mainImage?: number
    tags: []
}

const validationSchema = yup.object({
    name: yup.string().min(3).max(20).required(),
    url: yup.string().min(3).max(10),
    price: yup.string()
        .matches(/[0-9]*/g, 'Price must be a number')
        .required(),
    images: yup.array()
        .min(1, 'Your product should have at least one image')
        .required()
});

interface ProductFormProps {
    className?: string
    product?: ProductFormValues,
    loading: boolean,
    onSubmit: (values: ProductFormValues, formikHelpers: FormikHelpers<ProductFormValues>) => Promise<void>
}


export const ProductForm: React.FC<ProductFormProps> = ({
    className,
    loading,
    product,
    onSubmit
}) => {
    const form = useFormStyles();

    const initialValues: ProductFormValues = product || {
        name: '', url: '', price: '',
        images: [], tags: []
    };

    return <div className={clsx(className)}>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className={form.form}>
                <Field
                    className={form.field}
                    name='name'
                    label='Product Name'
                />
                <Field
                    className={form.field}
                    name='url'
                    label='Product URL'
                    helperText="A short title for product's url"
                />
                <Field
                    className={form.field}
                    name='price'
                    label='Price ($)'
                    placeholder='00.00'
                />

                <Box marginY={2}>
                    <Typography variant='h4'>Product Image</Typography>
                </Box>

                <ProductImageUpload name='images' />

                <SpinnerButton
                    className={form.submitBtn}
                    color='primary'
                    variant='contained'
                    type='submit'
                    loading={loading}
                >
                    Submit
                </SpinnerButton>
            </Form>
        </Formik>
    </div>
}

const ProductImageUpload: React.FC<{ name: string }> = (props) => {
    // eslint-disable-next-line
    const [field, meta, helpers] = useField(props);

    return <>
        <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={(files) => helpers.setValue(files, true)}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
        />

        {meta.error && <Box marginTop={0.5}>
            <Typography
                color='error'
                variant='body2'
            >
                {meta.error}
            </Typography>
        </Box>}
    </>
}
