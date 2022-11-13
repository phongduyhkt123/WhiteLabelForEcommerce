import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import DeliveryAddressDialog from '~/components/Dialog/DeliveryAddressDialog';
import { route } from '~/config';
import * as request from '~/utils/httpRequest';
import DeliveryAddressItem from './DeliveryAddressItem';

const DeliveryAddress = () => {
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);

    const [deliveryAddress, setDeliveryAddress] = useState({});

    const [showDialog, setshowDialog] = useState(false);

    const getDeliveryAddresses = async () => {
        const res = await request.get(route.deliveryAddressAPI);
        setDeliveryAddresses(res.data.data);
    };

    useEffect(() => {
        getDeliveryAddresses();
    }, []);

    const updateDeliveryAddress = async ({ id, receiverName, receiverPhone, addressDetail, isDefault }) => {
        const params = { id, receiverName, receiverPhone, addressDetail, isDefault };
        const res = await request.put(route.deliveryAddressAPI, params);
    };

    const handleSetDefaultClick = () => {};
    const handleRemoveClick = () => {};
    const handleUpdateClick = (id) => {
        setDeliveryAddress(deliveryAddresses.find((item) => item.id === id));
        setshowDialog(true);
    };

    return (
        <>
            <Stack spacing={1} divider={<Divider />}>
                {deliveryAddresses.length > 0 ? (
                    deliveryAddresses.map((item, index) => (
                        <DeliveryAddressItem
                            key={index}
                            {...item}
                            handleSetDefaultClick={handleSetDefaultClick}
                            handleRemoveClick={handleRemoveClick}
                            handleUpdateClick={handleUpdateClick}
                        />
                    ))
                ) : (
                    <Typography variant="h4">Khong co dia chi giao hang</Typography>
                )}
            </Stack>
            <DeliveryAddressDialog open={showDialog} data={deliveryAddress} handleClose={() => setshowDialog(false)} />
        </>
    );
};

export default DeliveryAddress;
