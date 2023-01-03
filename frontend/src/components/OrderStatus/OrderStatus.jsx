import { Chip, Typography } from '@mui/material';
import React from 'react';
import { orderStatus } from '~/config';
const OrderStatus = ({ code, ...rest }) => {
    const status = orderStatus.items[code];
    return (
        <Chip
            label={orderStatus.labels[status.name]}
            {...rest}
            variant="outlined"
            sx={{ color: status.color, bgcolor: '#fff' }}
        />
        // <Typography variant="body1" color={status.color} {...rest}>
        //     {orderStatus.labels[status.name]}
        // </Typography>
    );
};

export default OrderStatus;
