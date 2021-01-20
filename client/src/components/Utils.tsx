interface AmountProps {
    amount?: number;
    currency: 'USD';
    sign?: boolean;
}

export const Amount: React.FC<AmountProps> = ({ amount = 0, currency, sign }) => {
    const formatter = new Intl
        .NumberFormat(
            'en-GB',
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                ...(sign ? {
                    style: 'currency',
                    currency,
                    currencyDisplay: 'narrowSymbol'
                } : {})
            }
        );

    return <>{formatter.format(amount)}</>;
}
