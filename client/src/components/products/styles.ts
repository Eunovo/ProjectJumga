import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useProductStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            display: 'grid',
            grdiColumnGap: `${theme.spacing()}px`,
            gridRowGap: theme.spacing(2),
            gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
            justifyItems: 'center',
            minWidth: `15rem`,
        },
        slider: {
            marginInline: 'auto',
            maxWidth: '18rem',
            [theme.breakpoints.up('sm')]: {
                maxWidth: '30rem'
            },
            [theme.breakpoints.up('md')]: {
                maxWidth: '50rem'
            }
        },
        sliderProduct: {
            marginInline: theme.spacing()
        },
        product: {
            backgroundColor: 'white',
            width: '15rem',
            padding: theme.spacing(2),
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
        name: {
            height: '4rem',
            overflow: 'hidden'
        },
        price: {
            fontSize: '1rem',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBlock: theme.spacing()
        },
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
