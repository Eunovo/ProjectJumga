import axios from "axios";
import { services } from "../../backend";
import { generateUniqueRandomString } from "../../utils";


interface PaymentRequest {
    amount: number,
    redirectUrl: string,
    customer: any,
    meta: any,
    narration: string
}

export class PaymentService {
    private instance;
    private baseURL = "https://api.flutterwave.com/v3";
    private secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    constructor() {
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: { 'Authorization': `Bearer ${this.secretKey}` }
        });
    }

    async getPaymentLink(request: PaymentRequest): Promise<string> {
        const { redirectUrl, narration, ...rest } = request;
        const tx_ref = `tranx-${generateUniqueRandomString()}`;

        const response = await this.instance.post('/payments', {
            ...rest,
            tx_ref,
            currency: "USD",
            redirect_url: redirectUrl,
            payment_options: "card",
            customizations: {
                title: "Jumga Payments",
                description: "Pay for your order"
            }
        });

        if (response.data.status !== "success")
            throw new Error(`Failed to initialize payment: ${response.data.message}`);

        (async () => {
            try {
                await services.Payment.create({
                    paidBy: rest.customer,
                    transactionRef: tx_ref,
                    currency: "USD",
                    amount: rest.amount,
                    meta: rest.meta,
                    narration,
                    status: 'pending',
                    gateway: 'Flutterwave'
                })
            } catch (error) {
                console.dir(error);
            }
        })();

        return response.data.data.link;
    }

    async verify(tranxId: string, tranxRef: string) {
        const [response, payment] = await Promise.all([
            this.instance
                .get(`/transactions/${tranxId}/verify`),
            services.Payment.findOne({ transactionRef: tranxRef })
        ]);

        if (response.data.status !== 'success')
            throw new Error(`Failed to verify transaction: ${response.data.message}`);

        const { status, currency, amount } = response.data.data;
        const expectedAmount = payment.amount;
        const expectedCurrency = payment.currency;

        if (
            status === 'successful'
            && amount >= expectedAmount
            && currency === expectedCurrency
        ) {
            services.Payment.updateOne({ _id: payment._id, status: 'verified' });
            return payment;
        }

        return null;
    }

    async payout(account: any) {
        const reference = `payout-${generateUniqueRandomString()}`;
        const response = await this.instance
            .post(`/transfers`, {
                account_bank: account.bankCode,
                account_number: account.number,
                amount: account.amount,
                currency: "USD",
                beneficiary_name: account.name,
                narration: "Transfer",
                reference
            });

        if (response.data.status !== 'success')
            throw new Error(`Failed to queue bulk transfer: ${response.data.message}`);
    
        return reference;
    }

    /**
     * Country Short Code
     * @param country 
     * @returns
     */
    async getBanks(country: string) {
        const response = await this.instance
            .get(`/banks/${country}`);

        if (response.data.status !== 'success')
            throw new Error(
                `Failed to fetch banks: ${response.data.message}`);

        return response.data.data;
    }

    async chargeBack() {
        const response = await this.instance
            .get(``);

        if (response.data.status !== 'success')
            throw new Error(
                `Failed to initiate charge back: ${response.data.message}`);
    }

}
