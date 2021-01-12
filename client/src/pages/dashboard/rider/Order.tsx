import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { SpinnerButton } from "../../../components/forms";
import { useGetOrders, useOrderDrop } from "../../../hooks/orders";
import { useCurrentUser } from "../../../state/AppState";
import { useStyles } from "../styles";
import { RiderPage } from "./RiderPage";

export const Order = () => {
    const classes = useStyles();
    const { orderId } = useParams<{ orderId: string }>();
    const { user } = useCurrentUser();
    const { data, loading, error } = useGetOrders("rider", { _id: orderId });

    const order = data?.[0];
    const customer = order?.customer;
    const deliveryAddress = order?.deliveryAddress;

    return <RiderPage selected='orders'>

        <Typography className={classes.header} variant='h4'>
            Order
        </Typography>

        <Box
            display='flex'
            marginY={2}
        >
            <MarkDeliveredButton orderId={orderId} userId={user._id} />
        </Box>

        <Box display='flex' justifyContent='space-between' flexWrap='wrap'>

            <Paper elevation={0}>

                <Typography variant='h5'>Customer Detail loading={loading}
                </Typography>

                <Detail loading={loading}
                    label='Full Name' value={customer.name} />

                <Detail loading={loading}
                    label='Email' value={customer.email} />

            </Paper>

            <Paper elevation={0}>

                <Typography variant='h5'>
                    Delivery Address
                </Typography>

                <Detail loading={loading}
                    label='Street' value={deliveryAddress.street} />

                <Detail loading={loading}
                    label='City' value={deliveryAddress.city} />

                <Detail loading={loading}
                    label='State' value={deliveryAddress.state} />

                <Detail loading={loading}
                    label='Country' value={deliveryAddress.country} />

            </Paper>

        </Box>



    </RiderPage>
}


interface MarkDeliveredButtonProps {
    orderId: string;
    userId: string;
}

const MarkDeliveredButton: React.FC<MarkDeliveredButtonProps> =
    ({ orderId, userId }) => {
        const { dropOrder, loading } = useOrderDrop();

        return <SpinnerButton
            color='primary'
            variant='contained'
            onClick={() => dropOrder(orderId, userId)}
            loading={loading}
        >
            Mark Delivered
    </SpinnerButton>
    }


interface DetailProps {
    loading: boolean
    label: string
    value: string
}

const Detail: React.FC<DetailProps> = ({ loading, label, value }) => {

    return <Box
        marginY={2}
    >
        <Box marginBottom={1}>
            {
                loading ? <Skeleton />
                    : <Typography variant='caption'>{label}</Typography>
            }
        </Box>

        {
            loading ? <Skeleton /> : <Typography>{value}</Typography>
        }
    </Box>
}
