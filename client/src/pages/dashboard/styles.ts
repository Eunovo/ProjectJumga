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
            width: '20vw',
            marginRight: theme.spacing(3)
        },
        content: {
            padding: theme.spacing(),
            flexGrow: 1
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
            minWidth: '8rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            [theme.breakpoints.up('md')]: {
                height: '8rem',
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
