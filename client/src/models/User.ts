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

export interface StoreOwner extends User, Payable {}

export interface Rider extends User, Payable {}
