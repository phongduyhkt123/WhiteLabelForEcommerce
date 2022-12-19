import { Check } from '@mui/icons-material';
import { Button, Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { deliveryAddress as deliveryAddressConfig } from '~/config';

const DeliveryAddressItemInfo = ({ item, isDefault = false }) => {
    const labels = deliveryAddressConfig.labels;
    const address = `${item.addressDetail}, ${item.addressWard.name}, ${item.addressWard.district.name}, ${item.addressWard.district.provinceCity.name}`;
    return (
        <Box>
            <Box display="flex">
                <Typography variant="h5">{item.receiverName}</Typography>
                <Typography variant="h5" color="primary" sx={{ mx: 4 }}>
                    {item.receiverPhone}
                </Typography>
            </Box>
            <Typography variant="body1">{address}</Typography>
            {isDefault ? (
                <Chip label="Default" color="primary" variant="outlined" size="small" icon={<Check />} />
            ) : (
                <Button variant="outlined">{labels.setAsDefault}</Button>
            )}
        </Box>
    );
};

export default DeliveryAddressItemInfo;