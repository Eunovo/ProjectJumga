import { Product } from "./Product";

export interface Order {
    _id: string,
    customerName: string,
    sales: { product: Partial<Product>, quantity: number}[],
    amountSold: number,
    status: OrderStatus,
    createdAt: Date,
    history: { status: OrderStatus, at: Date }[] 
}

export enum OrderStatus {
    pending = 'pending',
    completed = 'completed',
    cancelled = 'cancelled',
    returned = 'returned'
}

