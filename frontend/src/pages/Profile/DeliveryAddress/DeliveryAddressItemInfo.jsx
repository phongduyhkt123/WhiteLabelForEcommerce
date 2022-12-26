import { Check } from '@mui/icons-material';
import { Button, Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { deliveryAddress as deliveryAddressConfig } from '~/config';

const DeliveryAddressItemInfo = ({ item, canEdit = false, isDefault = false }) => {
    const labels = deliveryAddressConfig.labels;
    return (
        <Box>
            <Box display="flex">
                <Typography variant="body1">{item.receiverName}</Typography>
                <Typography variant="body1" color="primary" sx={{ mx: 4 }}>
                    {item.receiverPhone}
                </Typography>
            </Box>
            <Typography variant="body1">{item.addressString}</Typography>
            {canEdit &&
                (isDefault ? (
                    <Chip label="Default" color="primary" variant="outlined" size="small" icon={<Check />} />
                ) : (
                    <Button variant="outlined" size="small">
                        {labels.setAsDefault}
                    </Button>
                ))}
        </Box>
    );
};

export default DeliveryAddressItemInfo;
