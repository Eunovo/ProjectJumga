export interface Payout {
    amount: number
    currency: string
    status: PayoutStatus
    createdAt: Date
    paidOn: Date
}

export enum PayoutStatus {
    pending = 'pending',
    success = 'success',
    failed = 'failed'
}
