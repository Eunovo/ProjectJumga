import { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Chart } from 'react-charts';


export function LineChart() {
    const data = useMemo(
        () => [
            {
                label: '2019 Sales',
                data: [
                    ['Jan', 51], ['Feb', 69],
                    ['Mar', 90], ['Apr', 111],
                    ['May', 99], ['Jun', 125],
                    ['Jul', 222], ['Aug', 229],
                    ['Sep', 145], ['Oct', 321],
                    ['Nov', 559], ['Dec', 790]
                ]
            },
            {
                label: '2020 Sales',
                data: [
                    ['Jan', 111], ['Feb', 99],
                    ['Mar', 90], ['Apr', 150],
                    ['May', 99], ['Jun', 120],
                    ['Jul', 169], ['Aug', 100],
                    ['Sep', 145], ['Oct', 521],
                    ['Nov', 759], ['Dec', 890]
                ]
            },
            {
                label: '2021 Sales',
                data: [
                    ['Jan', 229],
                ]
            }
        ], []);

    const series = useMemo(
        () => ({
            showPoints: false
        }), []);

    const axes = useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ], []);

    return (
        <Box
            height={'15rem'}
            maxWidth={'40rem'}
            marginX='auto'
        >
            <Box marginBottom={2}>
                <Typography variant='caption'>
                    Sales Statistics
               </Typography>
            </Box>

            <Chart data={data} series={series} axes={axes} tooltip />
        </Box>
    )
}
