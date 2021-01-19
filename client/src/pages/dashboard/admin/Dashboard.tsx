import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles";
import { DashboardAction } from "../DashboardAction";
import { AdminPage } from "./AdminPage";

export const AdminDashboard = () => {
    const classes = useStyles();

    return <AdminPage selected='dashboard'>
        <Typography className={classes.header} align='center' variant='h4'>
            Welcome Admin!
        </Typography>

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
                    actionText='goto riders'
                    actionUrl={`/dashboard/riders`}
                >
                    <Box marginBottom={2}>
                        <Typography align='center' variant='h6'>
                            Riders</Typography>
                    </Box>

                    <Typography align='center'>
                        Checkout registered riders and add some more!
                    </Typography>
                </DashboardAction>

                <DashboardAction
                    actionText='goto refunds'
                    actionUrl={`/dashboard/refunds`}
                >
                    <Box marginBottom={2}>
                        <Typography align='center' variant='h6'>
                            Refunds</Typography>
                    </Box>

                    <Typography align='center'>
                        Some users may have requested refunds,
                        their orders might have been cancelled
                        or maybe they returned purchased goods
                    </Typography>
                </DashboardAction>
            </Box>

            <Box
                display='flex'
                justifyContent='space-between'
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

                <DashboardAction
                    actionText='goto settings'
                    actionUrl={`/dashboard/settings`}
                >
                    <Box marginBottom={2}>
                        <Typography align='center' variant='h6'>
                            Edit App settings</Typography>
                    </Box>

                    <Typography align='center'>
                        Edit App Fees and Commissions
                    </Typography>
                </DashboardAction>
            </Box>
        </Box>
    </AdminPage>
}
