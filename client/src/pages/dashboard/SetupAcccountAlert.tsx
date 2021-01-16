import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../state/AppState";
import { createStyles, makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexWrap: 'wrap'
        },
        icon: {
            width: 'auto'
        },
        message: {
            width: 'auto'
        },
        action: {
            width: '100%',
            margin: 0,
            padding: 0
        }
    })
);


export const SetupAccountAlert = () => {
    const classes = useStyles();
    const { user } = useCurrentUser();
    const history = useHistory();

    if (user?.account || !user.seller?.approved) return <></>;

    return <Alert
        classes={classes}
        severity='warning'
        action={
            <Button
                color="primary"
                size="small"
                onClick={() => history.push('/dashboard/settings')}
            >
                setup your account
            </Button>
        }
    >
        Your account is active and you can accept payments.
        We need account details so that we can pay you your earnings.
    </Alert>
}
