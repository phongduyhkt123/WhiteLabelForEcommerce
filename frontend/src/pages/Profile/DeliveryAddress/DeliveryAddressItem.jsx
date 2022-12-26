import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import DeliveryAddressItemInfo from './DeliveryAddressItemInfo';

const DeliveryAddressItem = ({
    item,
    isDefault = false,
    handleSetDefaultClick = () => {},
    handleRemoveClick = () => {},
    handleUpdateClick = () => {},
}) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <DeliveryAddressItemInfo item={item} isDefault={isDefault} canEdit />
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
