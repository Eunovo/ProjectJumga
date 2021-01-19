import { services } from '../../backend';

interface Sale {
    product: string;
    quantity: number;
}

export async function getDeliveryFee(sales: Sale[]) {
    const deliveryFee = await services.Commission
        .findOne({ key: 'deliveryFee' });
    return deliveryFee.value * sales.length;
}
