import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from 'formik';

type FieldProps = TextFieldProps & {
    className?: string;
    name: string;
}

export const Field: React.FC<FieldProps> = ({ name, helperText, ...props }) => {
    const [field, meta] = useField(name);

    const isError = meta.touched && meta.error ? true : false;
    if (isError) helperText = meta.error;

    return (
        <TextField
            error={isError}
            helperText={helperText}
            {...field} {...props} />
    )
}
