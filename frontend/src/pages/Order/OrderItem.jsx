import { MonetizationOn } from '@mui/icons-material';
import { Divider, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import OrderStatus from '~/components/OrderStatus/OrderStatus';
import { commas } from '~/utils/formater';
import OrderDetailItem from './OrderDetailItem';
import { Button } from 'react-admin';
import { useContext } from 'react';
import { ConfigContext } from '~/context/ConfigContext';

const OrderItem = ({ item }) => {
    const { order, orderStatus } = useContext(ConfigContext);
    const labels = order.labels;

    return (
        <Paper sx={{ p: 0.5 }}>
            <Box textAlign="right" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{item.createTime}</Typography>
                <OrderStatus code={item.status} />
            </Box>
            <Divider sx={{ m: 0.5 }} />
            <Stack spacing={2}>
                {item.orderDetails?.map((od, index) => (
                    <OrderDetailItem key={index} item={od} />
                ))}
            </Stack>
            <Divider sx={{ m: 0.5 }} />
            <Box textAlign="right">
                <Typography variant="h6" display="flex" alignItems="center" justifyContent="right">
                    <MonetizationOn /> {labels.total}: {commas(item?.total || 0)}
                </Typography>
                <Typography variant="h6">
                    {labels.note}: {item.note}
                </Typography>
            </Box>
            {orderStatus.items[item.status]?.cancelable && (
                <>
                    <Divider sx={{ m: 0.5 }} />
                    <Box textAlign="right">
                        <Button variant="contained" color="warning" onClick={() => console.log('click')}>
                            {labels.cancel}
                        </Button>
                    </Box>
                </>
            )}
        </Paper>
    );
};

export default OrderItem;
