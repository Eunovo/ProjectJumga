import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useCartStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {},
        bottomBar: {
            backgroundColor: 'white',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            paddingBlock: theme.spacing(2),
            borderColor: theme.palette.grey[300],
            borderTop: 'solid 1px'
        },
        flex: {
            display: 'flex',
            alignItems: 'center'
        },
        end: {
            justifyContent: 'flex-end'
        },
        grow: {
            flexGrow: 1
        },
        price: {
            fontWeight: 'bold',
            fontSize: '1.1rem',
            paddingRight: '12px'
        },
        quantity: {
            textAlign: 'center',
            minWidth: '4rem',
            borderBottom: 'solid 1px',
            borderColor: theme.palette.grey[100]
        }
    })
);
