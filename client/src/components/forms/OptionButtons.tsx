import React from "react";
import clsx from "clsx";
import {
    Button,
    makeStyles,
    Theme,
    createStyles
} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => createStyles({
    status: {
        color: 'grey'
    },
    selected: {
        color: 'black'
    }
}));


interface OptionButtonsProps {
    options: string[],
    selected: string,
    setSelected: (val: string) => void
}

export const HorizontalOptionButtons: React.FC<OptionButtonsProps> = ({ selected, setSelected, options }) => {
    const classes = useStyles();

    return <>
        {
            options.map((option, i) => (
                <Button
                    classes={{
                        text: clsx(classes.status, {
                            [classes.selected]: selected === option
                        })
                    }}
                    key={i}
                    variant='text'
                    onClick={() => setSelected(option)}
                >
                    {option}
                </Button>
            ))
        }
    </>
}
