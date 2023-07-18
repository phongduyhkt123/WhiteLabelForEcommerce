import { MonetizationOn } from '@mui/icons-material';
import { Divider, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useContext } from 'react';
import { Button } from 'react-admin';
import OrderStatus from '~/components/OrderStatus/OrderStatus';
import { ConfigContext } from '~/context/ConfigContext';
import { commas } from '~/utils/formater';
import OrderDetailItem from './OrderDetailItem';
import * as request from '~/utils/httpRequest';

const OrderItem = ({ item, setSelectedOrder, setOpenCommentDialog, setOpenConfirmDialog }) => {
    const { routes: route, order, orderStatus } = useContext(ConfigContext);
    const labels = order.labels;

    const handleCommentClick = () => {
        setSelectedOrder(item);
        setOpenCommentDialog(true);
    };

    const handleCancelClick = () => {
        setSelectedOrder(item);
        setOpenConfirmDialog(true);
    };

    const handlePayClick = () => {
        request
            .post(`${route.orderAPI.url}/${item.id}`)
            .then((res) => {
                if (res.status === 200) {
                    window.location.href = res.data;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                {item.note && (
                    <Typography variant="h6">
                        {labels.note}: {item.note}
                    </Typography>
                )}
            </Box>

            <>
                <Divider sx={{ m: 0.5 }} />
                <Box textAlign="right">
                    {orderStatus.items[item.status]?.cancelable && (
                        <Button variant="contained" color="warning" sx={{ mr: 2 }} onClick={handleCancelClick}>
                            {labels.cancel}
                        </Button>
                    )}
                    {orderStatus.items[item.status]?.ratingable && !item.isRated && (
                        <Button variant="contained" color="info" sx={{ mr: 2 }} onClick={handleCommentClick}>
                            {labels.rating}
                        </Button>
                    )}
                    {item.status === 'WAIT_FOR_PAYMENT' && (
                        <Button variant="contained" color="info" sx={{ mr: 2 }} onClick={handlePayClick}>
                            Thanh Toán
                        </Button>
                    )}
                </Box>
            </>
        </Paper>
    );
};

export default OrderItem;
