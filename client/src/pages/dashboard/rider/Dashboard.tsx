import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles";
import { RiderPage } from "./RiderPage"

export const RiderDashboard = () => {
    const classes = useStyles();

    return <RiderPage selected='dashboard'>
        <Typography className={classes.header} align='center' variant='h4'>
            Welcome Rider!
        </Typography>

        <Box
            component='div'
            display='flex'
            width='100%'
            maxWidth='60rem'
            marginX='auto'
        >

        </Box>
    </RiderPage>
}
