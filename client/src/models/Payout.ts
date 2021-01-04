export interface Payout {
    amount: number
    earningPeriod: { from: Date, to: Date }
    paidOn: Date
}
