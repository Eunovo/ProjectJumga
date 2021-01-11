import { useState } from 'react';
import Box from '@material-ui/core/Box';
import { BuyerForm, CheckoutForm } from './BuyerForm';
import { Confirmation } from './Confirmation';


export const Checkout = () => {
    const [stage, setStage] = useState(0);
    const [form, setForm] = useState<CheckoutForm>();

    return <Box
        maxWidth={'50rem'}
        marginBottom={6}
        marginX={'auto'}
    >

        {stage === 0 && <BuyerForm
            values={form}
            onSubmit={(form) => {
                setForm(form);
                setStage(1);
            }}
        />}
        {stage === 1 && <Confirmation
            form={form}
            backToCheckout={() => setStage(0)}
        />}

    </Box>
}
