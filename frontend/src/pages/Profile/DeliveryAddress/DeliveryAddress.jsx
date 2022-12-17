import { Add } from '@mui/icons-material';
import { Button, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import DeliveryAddressDialog from '~/components/Dialog/DeliveryAddressDialog';
import { route } from '~/config';
import * as request from '~/utils/httpRequest';
import DeliveryAddressItem from './DeliveryAddressItem';
import config from '~/data/config.json';
import { GlobalContext } from '~/context/GlobalContext';

const DeliveryAddress = () => {
    const labels = config.deliveryAddress.labels;

    const [deliveryAddress, setDeliveryAddress] = useState({});

    const { userInfo } = useContext(GlobalContext);

    const [showDialog, setshowDialog] = useState(false);

    const {
        data: deliveryAddresses,
        setData: setDeliveryAddresses,
        loaded,
    } = request.useAxios({ url: route.deliveryAddressAPI, isAuthen: true });

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

    const handleAddClick = () => {
        setDeliveryAddress('');
        setshowDialog(true);
    };

    const renderDeliveryAddressItem = () => {
        if (deliveryAddresses.length > 0)
            return deliveryAddresses.map((item, index) => (
                <DeliveryAddressItem
                    key={index}
                    item={item}
                    isDefault={userInfo?.defaultAddress.id === item.id}
                    handleSetDefaultClick={handleSetDefaultClick}
                    handleRemoveClick={handleRemoveClick}
                    handleUpdateClick={handleUpdateClick}
                />
            ));
        else return <Typography variant="h6">{labels.noDeliveryAddress}</Typography>;
    };

    return (
        <>
            <Button variant="contained" startIcon={<Add fontSize="small" />} onClick={handleAddClick}>
                {labels.addNewAddress}
            </Button>
            <Stack spacing={1} pt={2} divider={<Divider />}>
                {loaded && renderDeliveryAddressItem()}
            </Stack>
            <DeliveryAddressDialog
                open={showDialog}
                data={deliveryAddress}
                isDefault={deliveryAddress.id === userInfo?.defaultAddress.id}
                handleClose={() => setshowDialog(false)}
            />
        </>
    );
};

export default DeliveryAddress;
