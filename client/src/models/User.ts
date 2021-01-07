export interface User {
    firstName: string
    lastName: string
    email: string
    address: {
        country: string
        state: string
        city: string
        street: string
    }
    role: Role
    createdAt: Date
}

export enum Role {
    seller = 'seller',
    rider = 'rider',
    admin = 'admin'
}

export interface Payable {
    accountName: string
    accountNumber: string
    bank: string
}

export interface StoreOwner extends User, Payable {
    /**
     * `approved = true` when the seller
     * has paid the one-time registration fee
     */
    approved: boolean
    dispatchRider: string
}

export interface Rider extends User, Payable {}

export interface Admin extends User {}
