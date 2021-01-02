import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useSideBarStyles = makeStyles((theme: Theme) =>
    createStyles({
        sidebar: {
            backgroundColor: 'white',
            padding: theme.spacing(),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'stretch',
            borderRadius: '.5rem',
            boxShadow: theme.shadows[1]
        },
        sidebarItem: {
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            borderRadius: '.5rem',
            padding: theme.spacing(),
            marginBottom: theme.spacing()
        },
        selected: {
            color: 'white',
            backgroundColor: theme.palette.primary.dark
        },
        icon: {
            marginRight: theme.spacing(),
        }
    })
);
