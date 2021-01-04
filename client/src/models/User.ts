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
}

export interface Payable {
    accountName: string
    accountNumber: string
    bank: string
}

export interface StoreOwner extends User, Payable {}

export interface Rider extends User, Payable {}
