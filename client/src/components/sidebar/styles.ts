import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useSideBarStyles = makeStyles((theme: Theme) =>
    createStyles({
        sidebar: {
            backgroundColor: 'white',
            padding: theme.spacing(),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: '.5rem',
            boxShadow: theme.shadows[1],
            [theme.breakpoints.up('md')]: {
                alignItems: 'stretch'
            }
        },
        sidebarItem: {
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            padding: theme.spacing(),
            marginBottom: theme.spacing(),
            [theme.breakpoints.up('md')]: {
                borderRadius: '.5rem'
            }
        },
        selected: {
            color: 'white',
            backgroundColor: theme.palette.primary.dark,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark
            }
        },
        icon: {
            [theme.breakpoints.up('md')]: {
                marginRight: theme.spacing()
            }
        }
    })
);
