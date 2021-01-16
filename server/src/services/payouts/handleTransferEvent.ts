import { services } from "../../backend";


interface TransferEvent {
    reference: String
    status: 'SUCCESSFUL' | 'FAILED'
}

export async function handleTransferEvent(data: TransferEvent) {
    const { reference, status } = data;

    // check if payout is still pending
    const payout = await services.Payout.findOne({ reference });
    if (payout.status !== 'pending')
        throw new Error('Illegal Operation');

    // check if transfer was successfull
    if (status === 'SUCCESSFUL') {
        services.Payout.updateOne({
            status: 'success',
            paidOn: new Date()
        }, { _id: payout._id });
    } else {
        // transfer failed
        services.Payout.updateOne({
            status: 'failed',
        }, { _id: payout._id });
        // return user's money
        services.User.updateOne(
            { $inc: { wallet: payout.amount } },
            { _id: payout.user }
        );
    }
}
