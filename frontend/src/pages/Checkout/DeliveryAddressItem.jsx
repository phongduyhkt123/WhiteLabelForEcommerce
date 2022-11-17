import { Check, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Chip, Divider, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const DeliveryAddressItem = ({ address, isDefault, handleSetDefaultClick, handleRemoveClick, handleUpdateClick }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Box display="flex">
                    <Typography variant="h4">{address?.receiverName}</Typography>
                    <Typography variant="h4" color="primary" sx={{ mx: 4 }}>
                        {address?.receiverPhone}
                    </Typography>
                    <Chip label="Default" color="primary" variant="outlined" size="small" icon={<Check />} />
                </Box>
                <Typography variant="h5">
                    {address?.addressDetail}, {address?.addressWard.name}, {address?.addressWard.district.name},{' '}
                    {address?.addressWard.district.provinceCity.name}
                </Typography>
            </Box>
        </Box>
    );
};

export default DeliveryAddressItem;
