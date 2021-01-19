import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles";
import { SetupAccountAlert } from '../SetupAcccountAlert';
import { useCurrentUser } from "../../../state/AppState";
import { DashboardAction } from "../DashboardAction";
import { RiderPage } from "./RiderPage";


export const RiderDashboard = () => {
    const { user } = useCurrentUser();
    const classes = useStyles();

    return <RiderPage selected='dashboard'>
        <Typography className={classes.header} align='center' variant='h4'>
            Welcome Rider!
        </Typography>

        <Box marginBottom={4}>
            <SetupAccountAlert />
        </Box>

        <Box
            component='div'
            width='100%'
            maxWidth='60rem'
            marginX='auto'
        >
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='stretch'
                flexWrap='wrap'
                width='100%'
            >
                <DashboardAction
                    actionText='goto orders'
                    actionUrl={`/dashboard/orders`}
                >
                    <Box marginBottom={2}>
                        <Typography align='center' variant='h6'>
                            Make some deliveries</Typography>
                    </Box>

                    <Typography align='center'>
                        See new orders ready to be delivered!
                    </Typography>
                </DashboardAction>

                <DashboardAction
                    actionText='goto wallet'
                    actionUrl={`/dashboard/wallet`}
                >
                    <Box marginBottom={2}>
                        <Typography align='center' variant='h6'>
                            In need of cash?</Typography>
                    </Box>

                    <Typography align='center'>
                        Check out your wallet and make a withdrawal!
                    </Typography>
                </DashboardAction>
            </Box>

            <Box
                display='flex'
                justifyContent='center'
                alignItems='stretch'
                flexWrap='wrap'
                width='100%'
            >
                <DashboardAction
                    actionText='goto settings'
                    actionUrl={`/dashboard/settings`}
                >
                    <Box marginBottom={2}>
                        <Typography align='center' variant='h6'>
                            Edit your details</Typography>
                    </Box>

                    <Typography align='center'>
                        Maybe you just want to edit your personal information,
                        or your account details.
                    </Typography>
                </DashboardAction>
            </Box>
        </Box>
    </RiderPage>
}
