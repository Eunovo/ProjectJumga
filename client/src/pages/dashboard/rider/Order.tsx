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
import { OrderStatus } from "../../../models";

export const Order = () => {
    const classes = useStyles();
    const { code } = useParams<{ code: string }>();
    const { user } = useCurrentUser();
    const { data, loading, error } = useGetOrders("", { code });

    const order = data?.orders?.[0];
    const customer = order?.customer;
    const deliveryAddress = order?.deliveryAddress;

    const color = 'black';

    return <RiderPage selected='orders'>

        <Box
            className={classes.header}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            flexWrap='wrap'
        >
            <Typography variant='h4'>
                {code}
            </Typography>
            <Typography variant='h6' component='span'
                style={{ color, textTransform: 'uppercase' }}>
                {order?.status}
            </Typography>
        </Box>

        {
            order?.status === OrderStatus.paid &&
            <Box
                display='flex'
                marginBottom={3}
            >
                <MarkDeliveredButton code={code} userId={user._id} />
            </Box>
        }

        <Box>

            <Box marginY={2} width='100%'>
                <Paper variant='outlined'>

                    <Box padding={2}>
                        <Typography variant='h5'>Customer</Typography>

                        <Detail loading={loading}
                            label='Full Name' value={customer?.name} />

                        <Detail loading={loading}
                            label='Email' value={customer?.email} />
                    </Box>

                </Paper>
            </Box>

            <Box marginY={2} width='100%'>
                <Paper variant='outlined'>

                    <Box padding={2}>
                        <Typography variant='h5'>
                            Delivery Address
                        </Typography>

                        <Detail loading={loading}
                            label='Street' value={deliveryAddress?.street} />

                        <Detail loading={loading}
                            label='City' value={deliveryAddress?.city} />

                        <Detail loading={loading}
                            label='State' value={deliveryAddress?.state} />

                        <Detail loading={loading}
                            label='Country' value={deliveryAddress?.country} />
                    </Box>

                </Paper>
            </Box>

        </Box>



    </RiderPage>
}


interface MarkDeliveredButtonProps {
    code: string;
    userId: string;
}

const MarkDeliveredButton: React.FC<MarkDeliveredButtonProps> =
    ({ code, userId }) => {
        const { dropOrder, loading } = useOrderDrop();

        return <SpinnerButton
            color='primary'
            variant='contained'
            onClick={() => dropOrder(code, userId)}
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
