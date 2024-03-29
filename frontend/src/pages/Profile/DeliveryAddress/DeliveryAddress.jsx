import { Add } from '@mui/icons-material';
import { Button, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import DeliveryAddressDialog from '~/components/Dialog/DeliveryAddressDialog';
import { route } from '~/config';
import * as request from '~/utils/httpRequest';
import DeliveryAddressItem from './DeliveryAddressItem';
import { deliveryAddress as defaultAddressConfig } from '~/config';
import { GlobalContext } from '~/context/GlobalContext';
import Title from '~/components/Title/Title';

const DeliveryAddress = ({ title }) => {
    const labels = defaultAddressConfig.labels;

    const [deliveryAddress, setDeliveryAddress] = useState({});

    const { data: userInfo } = request.useAxios({ url: route.userProfileAPI.url, isAuthen: true });

    const [showDialog, setshowDialog] = useState(false);

    const {
        data: deliveryAddresses,
        setData: setDeliveryAddresses,
        loaded,
    } = request.useAxios({ url: route.deliveryAddressAPI.url, isAuthen: true });

    const handleSetDefaultClick = (id) => {
        request
            .patch(route.setDefaultAddress.url + id)
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    };
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
                    isDefault={userInfo?.defaultAddress?.id === item.id}
                    handleSetDefaultClick={handleSetDefaultClick}
                    handleRemoveClick={handleRemoveClick}
                    handleUpdateClick={handleUpdateClick}
                />
            ));
        else return <Typography variant="h6">{labels.noDeliveryAddress}</Typography>;
    };

    return (
        <Title title={title}>
            <Button variant="contained" startIcon={<Add fontSize="small" />} onClick={handleAddClick}>
                {labels.addNewAddress}
            </Button>
            <Stack spacing={1} pt={2} divider={<Divider />}>
                {loaded && renderDeliveryAddressItem()}
            </Stack>
            <DeliveryAddressDialog
                open={showDialog}
                data={deliveryAddress}
                isDefault={deliveryAddress?.id === userInfo?.defaultAddress?.id}
                setDeliveryAddresses={setDeliveryAddresses}
                handleClose={() => setshowDialog(false)}
            />
        </Title>
    );
};

export default DeliveryAddress;
