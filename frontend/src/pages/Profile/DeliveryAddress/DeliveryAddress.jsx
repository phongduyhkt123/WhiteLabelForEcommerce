import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { route } from '~/config';
import * as request from '~/utils/httpRequest';
import DeliveryAddressItem from './DeliveryAddressItem';

const DeliveryAddress = () => {
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);

    const getDeliveryAddresses = async () => {
        const res = await request.get(route.deliveryAddressAPI);
        setDeliveryAddresses(res.data.data);
    };

    useEffect(() => {
        getDeliveryAddresses();
    }, []);

    return (
        <Stack spacing={1} divider={<Divider />}>
            {deliveryAddresses.length > 0 ? (
                deliveryAddresses.map((item, index) => <DeliveryAddressItem key={index} item={item} />)
            ) : (
                <Typography variant="h4">Khong co dia chi giao hang</Typography>
            )}
        </Stack>
    );
};

export default DeliveryAddress;
