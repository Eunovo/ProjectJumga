import { repos } from "../../backend";


export async function updateStatus(status: string, orderId: string) {
    const order = await repos.Order.findOne({ _id: orderId });
    if (!order) throw new Error(`Order ${orderId} Not Found`);

    const { history } = order;
    return repos.Order.updateOne(
        { _id: orderId }
        {
            status,
            history: [...history, { status, at: new Date() }]
        }
    );
}
