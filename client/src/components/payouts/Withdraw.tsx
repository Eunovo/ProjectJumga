import { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ButtonProps } from '@material-ui/core/Button';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Field, SpinnerButton } from '../../components/forms';
import { useRequestPayout } from '../../hooks/payouts';
import { useCurrentUser } from '../../state/AppState';


interface WithdrawProps {
    open: boolean
    handleOpen: () => void
    handleClose: () => void
}

export function useWithdraw(): WithdrawProps {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return {
        open,
        handleOpen,
        handleClose
    };
}


export const WithdrawButton: React.FC<Pick<WithdrawProps, "handleOpen"> & ButtonProps> =
    ({ handleOpen, ...buttonProps }) => {
        return <Button
            color='primary'
            variant='contained'
            {...buttonProps}
            onClick={handleOpen}
        >
            withdraw
        </Button>;
    }


export const WithdrawDialog: React.FC<WithdrawProps> = ({ open, handleClose }) => {
    const { user } = useCurrentUser();
    const { withdraw, loading, error } = useRequestPayout();

    const validationSchema = yup.object({
        amount: yup.string()
            .matches(/[0-9]/g, 'amount must be a number')
            .required()
            .test(
                'amount',
                'You cannot withdraw more than you have in your wallet',
                (value) => user.wallet >= Number.parseInt(value as string)
            )
    });

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="withdraw-dialog-title"
    >
        <DialogTitle id="withdraw-dialog-title">Withdraw</DialogTitle>

        {error?.message && <Box marginTop={2}>
            <Alert severity='error'>{error.message}</Alert>
        </Box>}

        <Formik
            initialValues={{ amount: '0' }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                try {
                    await withdraw(Number.parseInt(values.amount));
                } catch (error) {
                    actions.setErrors(error?.errors);
                }
            }}
        >
            <Form>

                <DialogContent>
                    <DialogContentText>
                        Enter the amount you want to withdraw.
                        Your withdrawal will be complete within the next 7 working days.
                    </DialogContentText>

                    <Field
                        autoFocus
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div>$</div>
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                    >Cancel</Button>

                    <SpinnerButton
                        loading={loading}
                        type='submit'
                        color="primary"
                        variant="contained"
                    >
                        withdraw
                    </SpinnerButton>
                </DialogActions>

            </Form>
        </Formik>

    </Dialog>;
}
