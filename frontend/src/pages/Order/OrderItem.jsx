import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import OrderDetailItem from './OrderDetailItem';

const OrderItem = () => {
    return (
        <Box>
            <Stack spacing={2}>
                {[1, 2].map((item, index) => (
                    <OrderDetailItem key={index} />
                ))}
            </Stack>
            <Box>
                <Typography variant="h6">Tổng tiền: 1000000d</Typography>
            </Box>
        </Box>
    );
};

export default OrderItem;
