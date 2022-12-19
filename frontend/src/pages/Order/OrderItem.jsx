import { MonetizationOn } from '@mui/icons-material';
import { Divider, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { commas } from '~/utils/formater';
import OrderDetailItem from './OrderDetailItem';
import { order as orderConfig } from '~/config';

const OrderItem = ({ item }) => {
    const labels = orderConfig.labels;

    return (
        <Paper sx={{ p: 0.5 }}>
            <Box>
                <Typography variant="body1" textAlign="right">
                    {item.status}
                </Typography>
                <Divider sx={{ m: 0.5 }} />
            </Box>
            <Stack spacing={2}>
                {item.orderDetails.map((od, index) => (
                    <OrderDetailItem key={index} item={od} />
                ))}
            </Stack>
            <Divider sx={{ m: 0.5 }} />
            <Box textAlign="right">
                <Typography variant="h6" display="flex" alignItems="center" justifyContent="right">
                    <MonetizationOn /> {labels.total}: {commas(item?.payPrice || 0)}
                </Typography>
                <Typography variant="h6">
                    {labels.note}: {item.note}
                </Typography>
            </Box>
        </Paper>
    );
};

export default OrderItem;
