import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ButtonProps } from '@material-ui/core';

interface SpinnerButtonProps extends ButtonProps {
    loading: boolean;
}

export const SpinnerButton: React.FC<SpinnerButtonProps> = ({ children, loading, ...props }) => {
    return <Button {...props}>
        <Box
            display='flex'
            alignItems='center'
        >
            {children}
            {
                loading && <CircularProgress
                    color='inherit'
                    size='20px'
                    style={{  marginLeft: '1rem' }}
                />
            }
        </Box>
    </Button>
}
