import axios from "axios";

interface PaymentRequest {
    amount: number,
    redirectUrl: string,
    customer: any,
    meta: any
}

export class PaymentService {
    private instance;
    private baseURL = "https://api.flutterwave.com/v3";
    private secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    constructor() {
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 1000,
            headers: { 'Authorization': `Bearer ${this.secretKey}` }
        });
    }

    async getPaymentLink(request: PaymentRequest): Promise<string> {
        const { redirectUrl, ...rest } = request;

        const response = await this.instance.post('/payment', {
            ...rest,
            tx_ref: "hooli-tx-1920bbtytty",
            currency: "USD",
            redirect_url: redirectUrl,
            payment_options: "card",
            customizations: {
               title: "Jumga Payments",
               description: "Pay for your order",
            //    logo: "https://assets.piedpiper.com/logo.png"
            }
        });

        if (response.data.status !== "success")
            throw new Error(`Failed to initialize payment: ${response.data.message}`);

        return response.data.data.link;
    }

    async verify(tranxId: string, expectedAmount: number) {
        const response = await this.instance
            .get(`/transactions/${tranxId}/verify`);

        if (response.data.status !== 'success')
            throw new Error(`Failed to verify transaction: ${response.data.message}`);

        const { status, amount } = response.data.data;
        return (status === 'success' && amount >= expectedAmount);
    }

    async payout(accounts: any[]) {

    }

}
