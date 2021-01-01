import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    authRoot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        paddingInline: theme.spacing(4),
        minBlockSize: '100vh'
    },
    authForm: {
        marginBlockStart: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        maxInlineSize: '30rem',
        width: '100%'
    },
    field: {
        marginBlockStart: theme.spacing(3)
    },
    submitBtn: {
        marginBlockStart: theme.spacing(8),
        marginInline: 'auto',
        width: '50%'
    }
}));
