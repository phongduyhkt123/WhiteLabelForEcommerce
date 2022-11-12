import { Divider } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import DeliveryAddressItem from './DeliveryAddressItem';

const DeliveryAddress = () => {
    return (
        <Stack spacing={1} divider={<Divider />}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <DeliveryAddressItem key={index} />
            ))}
        </Stack>
    );
};

export default DeliveryAddress;
