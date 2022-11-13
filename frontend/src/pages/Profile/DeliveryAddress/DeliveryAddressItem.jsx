import { Check, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Chip, Divider, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const DeliveryAddressItem = ({ item }) => {
    console.log(item);
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Box display="flex">
                    <Typography variant="h4">Pham Phong Duy</Typography>
                    <Typography variant="h4" color="primary" sx={{ mx: 4 }}>
                        0832780143
                    </Typography>
                    <Chip label="Default" color="primary" variant="outlined" size="small" icon={<Check />} />
                    <Button variant="outlined">Dat lam mac dinh</Button>
                </Box>
                <Typography variant="h5">Địa chỉ giao hàng</Typography>
            </Box>

            <Box>
                <Box display="flex">
                    <IconButton>
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
