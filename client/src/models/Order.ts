import { Product } from "./Product";

export interface Order {
    _id: string,
    code: string,
    customer: {
        name: string
    },
    sales: { product: Partial<Product>, quantity: number}[],
    amountSold: number,
    status: OrderStatus,
    createdAt: Date,
    history: { status: OrderStatus, at: Date }[] 
}

export enum OrderStatus {
    pending = 'pending',
    paid = 'paid',
    completed = 'completed',
    cancelled = 'cancelled',
    returned = 'returned'
}

