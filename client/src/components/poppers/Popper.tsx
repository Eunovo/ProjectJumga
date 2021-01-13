import { useState } from "react";
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';


interface PopperProps {
    open: boolean
    anchorEl: HTMLElement | null
    placement: PopperPlacementType
}

export function usePopper() {
    const [state, setState] = useState<PopperProps>({
        open: false,
        anchorEl: null,
        placement: 'bottom-end'
    });

    const togglePopper = (props: Partial<PopperProps>) => {
        setState(s => ({
            ...s,
            ...props,
            open: !s.open
        }));
    }

    return { togglePopper, ...state }
}


export const PositionedPopper: React.FC<PopperProps> = ({ children, ...props }) => (
<Popper {...props} transition>
    {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
            <Paper>
                {children}
            </Paper>
        </Fade>
    )}
</Popper>
)
