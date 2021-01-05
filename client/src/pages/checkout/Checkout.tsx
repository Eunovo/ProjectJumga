import { useState } from 'react';
import Box from '@material-ui/core/Box';
import { BuyerForm } from './BuyerForm';
import { Confirmation } from './Confirmation';


export const Checkout = () => {
    const [stage, setStage] = useState(1);
   
    return <Box
        maxWidth={'50rem'}
        marginBottom={6}
        marginX={'auto'}
    >

        {stage === 0 && <BuyerForm onSubmit={() => setStage(1)} />}
        {stage === 1 && <Confirmation backToCheckout={() => setStage(0)} />}      

    </Box>
}
