import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../state/AppState";


export const SetupAccountAlert = () => {
    const { user } = useCurrentUser();
    const history = useHistory();

    if (user?.account || !user.seller?.approved) return <></>;

    return <Alert
        severity='warning'
        action={
            <Button
                color="inherit"
                size="small"
                onClick={() => history.push('/settings')}
            >
                setup your account
            </Button>
        }
    >
        Your account is active and you can accept payments.
        We need account details so that we can pay you your earnings.
    </Alert>
}
