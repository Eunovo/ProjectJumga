import { services } from "../../backend";

interface Address {
    country: string
    state: string
    city: string
}

export async function getNearestRider(address: Address) {
    const riders = await services.User.findMany({
        "address.country": address.country
    });

    let nearestRider = riders?.[0] || null;
    riders.forEach((rider: any) => {
        if (
            rider.address.state === address.state
            && nearestRider.address.state !== address.state) {
                nearestRider = rider;
        }
        if (
            rider.address.state === address.state
            && rider.address.city === address.city
            && nearestRider.address.city !== address.city) {
                nearestRider = rider;
        }
    });

    if (nearestRider === null)
        throw new Error('No dispatch Riders available at delivery location');

    return nearestRider;
}
