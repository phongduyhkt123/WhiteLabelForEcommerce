import { Box } from '@mui/material';
import DeliveryAddressItemInfo from '../Profile/DeliveryAddress/DeliveryAddressItemInfo';

const DeliveryAddressItem = ({ address, isDefault, handleSetDefaultClick, handleRemoveClick, handleUpdateClick }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <DeliveryAddressItemInfo item={address} isDefault={isDefault} />
        </Box>
    );
};

export default DeliveryAddressItem;
