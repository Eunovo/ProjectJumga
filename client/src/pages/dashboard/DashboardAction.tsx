import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';


interface DashboardActionProps {
    actionUrl: string;
    actionText: string;
}

export const DashboardAction: React.FC<DashboardActionProps> =
    ({ children, actionText, actionUrl }) => {
        const history = useHistory();

        return <>
            <Hidden mdUp>
                <Paper variant='outlined' style={{
                    minHeight: '10rem', width: '100%', marginTop: '16px'
                }}>
                    <Box padding={2} display='flex' flexDirection='column' height='100%'>

                        <Box flexGrow='1'>
                            {children}
                        </Box>

                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            marginTop={2}
                        >
                            <Button color='primary' variant='contained'
                                onClick={() => history.push(actionUrl)}
                            >
                                {actionText}</Button>
                        </Box>
                    </Box>
                </Paper>
            </Hidden>

            <Hidden smDown>
                <Paper variant='outlined' style={{ minHeight: '10rem', width: '48%', marginTop: '16px' }}>
                    <Box padding={2} display='flex' flexDirection='column' height='100%'>

                        <Box flexGrow='1'>
                            {children}
                        </Box>

                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            marginTop={2}
                        >
                            <Button color='primary' variant='contained'
                                onClick={() => history.push(actionUrl)}
                            >
                                {actionText}</Button>
                        </Box>
                    </Box>
                </Paper>
            </Hidden>
        </>
    }
