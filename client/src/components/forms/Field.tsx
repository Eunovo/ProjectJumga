import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from 'formik';
import { unformatAmount } from '../../utils';

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

export const AmountField: React.FC<FieldProps> = ({ name, helperText, ...props }) => {
    const [field, meta, action] = useField(name);

    const isError = meta.touched && meta.error ? true : false;
    if (isError) helperText = meta.error;

    const formatter = new Intl
        .NumberFormat('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    return (
        <TextField
            error={isError}
            helperText={helperText}
            {...field} {...props}
            onFocus={() => {
                if (!field.value) return;
                action.setValue(
                    `${unformatAmount(field.value)}`);
            }}
            onBlur={() => {
                if (!field.value) {
                    action.setValue('0.00');
                    return;
                }

                const parsed = parseFloat(field.value
                    .replaceAll(',', '')
                    .replaceAll(' ', '')
                );
                if (parsed === NaN) {
                    action.setValue('0.00');
                    return;
                }
                const formattedValue = formatter.format(parsed);

                action.setValue(formattedValue);
            }}
        />
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
