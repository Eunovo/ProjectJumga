import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles";
import { SetupAccountAlert } from '../SetupAcccountAlert';
import { RiderPage } from "./RiderPage";
import { useCurrentUser } from "../../../state/AppState";


export const RiderDashboard = () => {
    const { user } = useCurrentUser();
    const classes = useStyles();

    return <RiderPage selected='dashboard'>
        <Typography className={classes.header} align='center' variant='h4'>
            Welcome Rider!
        </Typography>

        <Box marginBottom={2}>
            <SetupAccountAlert />
        </Box>

        <Box
            width='100%'
            maxWidth='30rem'
            marginX='auto'
            marginBottom={2}
        >
            <Paper elevation={0}>
                <Typography
                    align='center'
                    style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                >
                    $ {user.earnings}
                </Typography>
            </Paper>
        </Box>

        <Box
            component='div'
            display='flex'
            flexWrap='wrap'
            width='100%'
            maxWidth='60rem'
            marginX='auto'
        >
        </Box>
    </RiderPage>
}
