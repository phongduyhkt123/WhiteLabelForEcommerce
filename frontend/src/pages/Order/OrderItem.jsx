import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import OrderDetailItem from './OrderDetailItem';
import { commas } from '~/utils/formater';

const OrderItem = ({ item }) => {
    return (
        <Box>
            <Box>
                <Typography variant="h6">delivery address __________</Typography>
                <Typography variant="body1">{item.status}</Typography>
            </Box>
            <Stack spacing={2}>
                {item?.orderDetails?.map((od, index) => (
                    <OrderDetailItem key={index} item={od} />
                ))}
            </Stack>
            <Box>
                <Typography variant="h6">Tổng tiền: {commas(item?.payPrice || 0)}</Typography>
                <Typography variant="h6">Note: {item.note}</Typography>
            </Box>
        </Box>
    );
};

export default OrderItem;
