import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

export interface SelectProps {
    className?: string;
    name: string;
    label?: string;
    helperText?: string;
    displayEmpty?: boolean;
}

export const SelectField: React.FC<SelectProps> = ({
    className,
    children,
    name,
    label,
    helperText,
    displayEmpty
}) => {
    const [field, meta] = useField(name);

    const isError = meta.touched && meta.error ? true : false;
    if (isError) helperText = meta.error;

    return <FormControl className={className} error={isError}>
        {
            label && <InputLabel shrink id={`${name}-label-id`}>
                {label}
            </InputLabel>
        }
        <Select
            labelId={`${name}-label-id`}
            id={`${name}-id`}
            displayEmpty={displayEmpty}
            {...field}
        >
            {children}
        </Select>
        {
            helperText && <FormHelperText>{helperText}</FormHelperText>
        }
    </FormControl>
}
