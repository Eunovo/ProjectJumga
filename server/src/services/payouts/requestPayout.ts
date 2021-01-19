import { paymentService } from "../payment";
import { services } from "../../backend";


export async function requestPayout(amount: number, context: any) {
    const { principal } = context;
    if (!principal)
        throw new Error('Unauthorised');

    // Remove the amount from the user's account first
    await services.User.updateOne(
        { $inc: { wallet: -amount } },
        { email: principal?.email }
    );

    try {
        const user = await services.User
            .findOne({ email: principal?.email });

        if (
            !user.account?.name
            || !user.account?.number
            || !user.account?.bankCode
        ) throw new Error('Missing Account Details');

        // ensure that amount deducted was not more than
        // the user had
        if (user.wallet < 0)
            throw new Error('Balance Insufficient');

        const reference = await paymentService.payout(
            { ...user.account, amount },
            user.address
        );

        services.Payout.create({
            user: user._id,
            amount, currency: 'USD',
            reference
        });
    } catch (error) {
        // Return the user's money
        services.User.updateOne(
            { $inc: { wallet: amount } },
            { email: principal?.email }
        );
        throw error;
    }
}
