import React from 'react';
import clsx from 'clsx';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';
import { Field } from '../forms';


interface ProductFormValues {
    name: string
    url: string
    price: number
    stock: number
    images: (File | string)[]
    mainImage?: number
    tags: []
}

const validationSchema = yup.object({
    name: yup.string().min(3).max(20).required(),
    url: yup.string().min(3).max(10),
    price: yup.number().min(1),
    images: yup.array()
        .min(1, 'Your product should have at least one image')
        .required()
});

interface ProductFormProps {
    className?: string
    product?: ProductFormValues,
    onSubmit: (values: ProductFormValues, formikHelpers: FormikHelpers<ProductFormValues>) => Promise<void>
}


export const ProductForm: React.FC<ProductFormProps> = ({ className, product, onSubmit }) => {
    const initialValues: ProductFormValues = product || {
        name: '', url: '', price: 1, stock: 0,
        images: [], tags: []
    };
    
    return <div className={clsx(className)}>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <Field
                    name='name'
                    label='Product Name'
                />
                <Field
                    name='url'
                    label='Product URL'
                    helperText="A short title for product's url"
                />
                <Field
                    name='price'
                    label='Price ($)'
                    type='number'
                />
                <Field
                    name='stock'
                    label='Stock'
                    type='number'
                    helperText="How much of this product do you have in Stock?"
                />

                <Button color='primary' variant='contained'>
                    Submit
                </Button>
            </Form>
        </Formik>
    </div>
}
