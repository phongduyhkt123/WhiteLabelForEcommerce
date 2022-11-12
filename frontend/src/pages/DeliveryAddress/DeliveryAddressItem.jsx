import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const DeliveryAddressItem = () => {
    return (
        <>
            <Box>
                <Box display="flex">
                    <Typography variant="h4">Pham Phong Duy</Typography>
                    <Typography variant="h4" color="primary" sx={{ ml: 2 }}>
                        {' '}
                        0832780143
                    </Typography>
                </Box>
                <Typography variant="caption">Địa chỉ giao hàng</Typography>
            </Box>

            <Box>
                <Box display="flex">
                    <IconButton>
                        <Edit />
                    </IconButton>
                    <IconButton>
                        <Delete />
                    </IconButton>
                </Box>

                <Button variant="outlined">Dat lam mac dinh</Button>
            </Box>
        </>
    );
};

export default DeliveryAddressItem;
