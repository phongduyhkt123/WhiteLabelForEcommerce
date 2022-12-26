import { Typography } from '@mui/material';
import React from 'react';
import { orderStatus } from '~/config';
const OrderStatus = ({ code, ...rest }) => {
    const status = orderStatus.items[code];
    return (
        <Typography variant="body1" color={status.color} {...rest}>
            {orderStatus.labels[status.name]}
        </Typography>
    );
};

export default OrderStatus;
