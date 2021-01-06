import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dashboard: {
            display: 'flex',
            paddingInline: theme.spacing(2),
            marginBlock: theme.spacing(4)
        },
        sidebar: {
            height: '50vh',
            width: '10vw',
            marginRight: theme.spacing(3),
            [theme.breakpoints.up('md')]: {
                width: '20vw'
            }
        },
        bottomMenu: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8vh',
            borderTop: `solid 1px ${theme.palette.grey[300]}`,
            zIndex: 1100
        },
        content: {
            padding: theme.spacing(),
            flexGrow: 1,
            marginBottom: '8vh',
            [theme.breakpoints.up('md')]: {
                width: `calc(80vw - ${theme.spacing(3)}px)`
            }
        },
        header: {
            marginBottom: theme.spacing(4)
        },
        grid: {
            marginInline: 'auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: theme.spacing(2),
            rowGap: `${theme.spacing(2)}px`,
            justifyItems: 'center',
            // maxWidth: '45rem',
            [theme.breakpoints.up('md')]: {
                gridTemplateColumns: '1fr 1fr 1fr 1fr'
            }
        },
        row: {
            display: 'flex'
        },
        infoBlock: {
            backgroundColor: 'white',
            borderRadius: '.5rem',
            boxShadow: theme.shadows[2],
            padding: theme.spacing(),
            textAlign: 'center',
            height: '6rem',
            width: '100%',
            marginTop: theme.spacing(2),
            marginInline: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            [theme.breakpoints.up('sm')]: {
                height: '8rem',
                maxWidth: '12rem',
                minWidth: '10rem',
            }
        },
        infoBlockMain: {
            fontSize: '2rem',
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            [theme.breakpoints.up('md')]: {
                fontSize: '3rem',
            }
        },
        infoBlockSub: {},
        table: {
            minWidth: 700
        }
    })
);
