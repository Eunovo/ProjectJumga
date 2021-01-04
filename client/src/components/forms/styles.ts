import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useFormStyles = makeStyles((theme: Theme) => 
    createStyles({
        form: {
            width: '100%',
            marginInline: 'auto',
            maxWidth: '40rem'
        },
        field: {
            marginBlock: theme.spacing(1.5),
            width: '100%'
        },
        submitBtn: {
            width: '100%',
            maxWidth: '20rem',
            display: 'block',
            marginTop: theme.spacing(4),
            marginInline: 'auto'
        }
    })
);