import { services } from "../../backend";


export async function getUserExtension(user: any) {
    let extension: any = {};
    if (user.role === 'seller') {
        extension = await services.Seller.findOne({ user: user._id });
        extension = { seller: extension };
    } else if (user.role === 'rider') {
        extension = await services.Rider.findOne({ user: user._id });
        extension = { rider: extension };
    }

    return extension;
}
