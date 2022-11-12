import { Box, Button, Divider, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';

const Order = () => {
    return (
        <Stack spacing={1} divider={<Divider />}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <OrderItem key={index} />
            ))}
        </Stack>
    );
};

export default Order;
