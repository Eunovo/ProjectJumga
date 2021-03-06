import {
    withStyles,
    Theme,
    createStyles,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';


export const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

export const FieldsTableHead: React.FC<any> = ({ fields, fieldsMap }) => (
    <TableHead>
        <TableRow>
            {
                Object.keys(fields)
                    .map((key, i) => {
                        const { title, render, ...props } = fieldsMap[key]
                        return <StyledTableCell {...props} key={i}>
                            {title}
                        </StyledTableCell>
                    })
            }
        </TableRow>
    </TableHead>
)

export const FieldsTableRow: React.FC<any> = ({
    row, fields, fieldsMap, placeholder = false
}) => (
    <StyledTableRow>
        {
            Object.keys(fields)
                .map((key, i) => {
                    const { render, ...props } = fieldsMap[key]
                    let view = <Skeleton />;
                    if (!placeholder)
                        view = render ? render(row[key], row) : row[key];
                    
                    return <StyledTableCell {...props} key={i}>
                        {view}
                    </StyledTableCell>
                })
        }
    </StyledTableRow>
)
