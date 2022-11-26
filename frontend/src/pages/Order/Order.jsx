import { Box, Button, Divider, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import * as request from '~/utils/httpRequest';
import { commas } from '~/utils/formater';
import { route } from '~/config';

const Order = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const response = await request.get(route.orderAPI);
        setOrders(response.data.data);
    };

    console.log(orders);

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Stack spacing={1} divider={<Divider />}>
            {orders.map((item) => (
                <OrderItem key={item.id} item={item} />
            ))}
        </Stack>
    );
};

export default Order;
