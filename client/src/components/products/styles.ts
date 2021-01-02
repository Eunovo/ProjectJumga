import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useProductStyles = makeStyles((theme: Theme) =>
    createStyles({
        slider: {
            marginInline: 'auto',
            maxWidth: '50rem'
        },
        product: {
            backgroundColor: 'white',
            width: '15rem',
            padding: theme.spacing(2),
            marginInline: theme.spacing(),
            border: 'solid 1px',
            borderColor: theme.palette.grey[300],
        },
        image: {
            width: '10rem',
            height: '14rem',
            marginInline: 'auto',
            marginBottom: theme.spacing(3),

            '& img': {
                objectFit: 'cover',
                height: '100%',
                width: '100%'
            }
        },
        name: {},
        arrow: {
            backgroundColor: 'white',
            borderRadius: '.5rem',
            border: 'solid 1px',
            borderColor: theme.palette.grey[300],
            width: '2rem',
            height: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
);
