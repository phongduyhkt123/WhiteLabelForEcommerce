import { Box, Button, Divider, Skeleton, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import PaymentMethodItem from '~/components/PaymentMethodItem/PaymentMethodItem';
import { CartItemSkeleton } from '~/components/Skeleton';
import StaticAlert from '~/components/StaticAlert/StaticAlert';
import { paymentMethods, route } from '~/config';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import config from '~/data/config.json';
import CartItem from '~/layouts/components/CartItem/CartItem';
import { commas } from '~/utils/formater';
import * as request from '~/utils/httpRequest';
import DeliveryAddressItem from './DeliveryAddressItem';

const Checkout = () => {
    const labels = config.labels.checkout;
    const currency = config.global.currency;

    const [paymentMethod, setPaymentMethod] = useState(1);

    const { setMessage, setShowMessage } = useContext(AlertContext);

    const [deliveryAddress, setDeliveryAddress] = useState(
        JSON.parse(localStorage.getItem('auth')).userInfo.defaultAddress,
    );

    const {
        data: checkoutProducts,
        setData: setCheckoutProducts,
        loaded,
    } = request.useAxios({ url: route.cartAPI, isAuthen: true });

    const handleCheckout = async () => {
        const params = {
            idAddress: deliveryAddress.id,
            note: 'note',
            paymentMethod: paymentMethod - 1,
            idProductVariations: checkoutProducts.map((item) => item.productVariation.id),
        };
        try {
            const res = await request.post(route.orderFromCartAPI, params);
            if (res.status === 200 && paymentMethod === 1) {
                setMessage({ text: 'Checkout success', severity: 'success', type: AlertTypes.SNACKBAR_LARGE });
                setShowMessage(true);
                setCheckoutProducts([]);
            }
        } catch (error) {
            setMessage({
                severity: 'error',
                text: error.response.data.message,
                type: AlertTypes.STATIC,
            });
            setShowMessage(true);
        }
    };

    const handleOpenModal = () => {};

    const renderCheckoutItems = () => {
        if (checkoutProducts.length > 0)
            return checkoutProducts.map((item, index) => <CartItem key={index} item={item} canControl={false} />);
        else return <Typography variant="h5">{labels.noProducts}</Typography>;
    };

    return (
        <>
            <Box my={3} display="flex" flexDirection="column" alignItems="center">
                <Grid2 container width="100%" spacing={2}>
                    <Grid2 item xs={12} md={6}>
                        <Box width="100%" p={2} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                            {/* List checkout Items */}
                            <Stack spacing={1} divider={<Divider />}>
                                {loaded ? renderCheckoutItems() : <CartItemSkeleton />}
                            </Stack>
                        </Box>
                    </Grid2>
                    {/* delivery address */}
                    <Grid2 item xs={12} md={6}>
                        <Box width="100%" height="auto" p={2} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                            <Typography variant="h6">{labels.deliveryAddress}</Typography>
                            {deliveryAddress ? (
                                <Box display="flex" justifyContent="space-between">
                                    <DeliveryAddressItem address={deliveryAddress} />
                                    <Button variant="outlined" onClick={handleOpenModal}>
                                        Change
                                    </Button>
                                </Box>
                            ) : (
                                <Typography variant="h6">{labels.noDeliveryAddress}</Typography>
                            )}
                        </Box>
                    </Grid2>
                </Grid2>

                {/* checkout and payment method */}
                <Box width="100%" p={2} mt={3} sx={{ boxShadow: 1, bgcolor: 'background.white', borderRadius: 2 }}>
                    <Grid2 container>
                        {/* payment method */}
                        <Grid2 item xs={12} md={6}>
                            <Typography variant="h6">{labels.paymentMethod}</Typography>
                            <Stack spacing={1} divider={<Divider />}>
                                {paymentMethods.map((item, index) => (
                                    <PaymentMethodItem
                                        key={index}
                                        {...item}
                                        selectedID={paymentMethod}
                                        onClick={(id) => setPaymentMethod(id)}
                                    />
                                ))}
                            </Stack>
                        </Grid2>
                        {/* Price and checkout */}
                        <Grid2 item xs={12} md={6} display="flex" justifyContent="center">
                            <div>
                                <div>
                                    <Typography>{labels.orderSummary}: </Typography>
                                    <Typography>{`${currency.symbol}${commas(100000)}`}</Typography>
                                </div>
                                <div>
                                    <Button LinkComponent={Link} to={route.home} size="large" variant="outlined">
                                        {labels.addMoreProducts}
                                    </Button>
                                    <Button size="large" variant="contained" onClick={handleCheckout}>
                                        {labels.order}
                                    </Button>
                                </div>
                            </div>
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
            <StaticAlert />
        </>
    );
};

export default Checkout;
