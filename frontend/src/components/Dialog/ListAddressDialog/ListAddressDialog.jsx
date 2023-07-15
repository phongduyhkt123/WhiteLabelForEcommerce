import { ButtonBase, Divider, Radio, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import { ConfigContext } from '~/context/ConfigContext';
import DeliveryAddressItem from '~/pages/Checkout/DeliveryAddressItem';
import * as request from '~/utils/httpRequest';

export default function ListAddressDialog({ selected, handleClose, handleSaveDeliveryAddress }) {
    const { routes: route } = useContext(ConfigContext);

    const { data: deliveryAddresses, loaded } = request.useAxios({ url: route.deliveryAddressAPI.url, isAuthen: true });

    const [deliveryAddress, setDeliveryAddress] = useState(selected);

    const handleSave = () => {
        handleSaveDeliveryAddress(deliveryAddress);
        handleClose();
    };

    return (
        <Dialog open={true}>
            <DialogTitle>Delivery Address</DialogTitle>
            <DialogContent>
                <DialogContentText>Choose delivery address</DialogContentText>
                {loaded && (
                    <Stack
                        spacing={1}
                        divider={<Divider />}
                        mt={2}
                        p={1}
                        border="2px solid"
                        sx={{ borderColor: 'primary.main' }}
                    >
                        {deliveryAddresses?.map((item) => (
                            <Box
                                display="flex"
                                alignItems="center"
                                component={ButtonBase}
                                justifyContent="start"
                                onClick={(e) => setDeliveryAddress(item)}
                            >
                                <Radio
                                    checked={deliveryAddress.id === item.id}
                                    value={item.id}
                                    sx={{ color: 'primary.main' }}
                                />
                                <DeliveryAddressItem address={item} isDefault={false} />
                            </Box>
                        ))}
                    </Stack>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Select</Button>
            </DialogActions>
        </Dialog>
    );
}
