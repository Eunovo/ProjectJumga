import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles";
import { AdminPage } from "./AdminPage";

export const AdminDashboard = () => {
    const classes = useStyles();

    return <AdminPage selected='dashboard'>
        <Typography className={classes.header} align='center' variant='h4'>
            Welcome Admin!
        </Typography>

        <Box
            component='div'
            display='flex'
            width='100%'
            maxWidth='60rem'
            marginX='auto'
        >

        </Box>
    </AdminPage>
}
