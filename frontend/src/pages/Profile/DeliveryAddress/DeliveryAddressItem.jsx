import { Check, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Chip, Divider, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';
import { GlobalContext } from '~/context/GlobalContext';

const DeliveryAddressItem = ({ item, handleSetDefaultClick, handleRemoveClick, handleUpdateClick }) => {
    const { userInfo } = useContext(GlobalContext);
    const address = `${item?.addressDetail}, ${item?.addressWard.name}, ${item?.addressWard.district.name}, ${item?.addressWard.district.provinceCity.name}`;
    const isDefault = userInfo?.defaultAddress.id === item.id;
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Box display="flex">
                    <Typography variant="h4">{item.receiverName}</Typography>
                    <Typography variant="h4" color="primary" sx={{ mx: 4 }}>
                        {item.receiverPhone}
                    </Typography>
                    {isDefault ? (
                        <Chip label="Default" color="primary" variant="outlined" size="small" icon={<Check />} />
                    ) : (
                        <Button variant="outlined">Dat lam mac dinh</Button>
                    )}
                </Box>
                <Typography variant="h5">{address}</Typography>
            </Box>

            <Box>
                <Box display="flex">
                    <IconButton onClick={() => handleUpdateClick(item.id)}>
                        <Edit />
                    </IconButton>
                    <IconButton>
                        <Delete color="error" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default DeliveryAddressItem;
