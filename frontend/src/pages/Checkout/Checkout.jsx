import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useContext, useEffect, useState } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ListAddressDialog from '~/components/Dialog/ListAddressDialog/ListAddressDialog';
import PaymentMethodItem from '~/components/PaymentMethodItem/PaymentMethodItem';
import { CartItemSkeleton } from '~/components/Skeleton';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import { commas } from '~/utils/formater';
import * as request from '~/utils/httpRequest';
import CheckOutItem from './CheckOutItem';
import DeliveryAddressItem from './DeliveryAddressItem';
import * as addressService from '~/services/addressService';
import { ConfigContext } from '~/context/ConfigContext';

const Checkout = () => {
    const { checkout, paymentMethods, routes: route } = useContext(ConfigContext);

    const labels = checkout.labels;

    const [searchParams, setSearchParams] = useSearchParams();

    const [paymentMethod, setPaymentMethod] = useState(1);

    const [shipFee, setShipFee] = useState(30000);

    const [orderSummary, setOrderSummary] = useState(0);

    const { setMessage, setShowMessage } = useContext(AlertContext);

    const [showListAddressDialog, setShowListAddressDialog] = useState(false);

    const navigate = useNavigate();

    const { data: userInfo } = request.useAxios({ url: route.userProfileAPI, isAuthen: true });

    console.log(userInfo);

    const [deliveryAddress, setDeliveryAddress] = useState();

    useEffect(() => {
        if (userInfo?.defaultAddress) {
            setDeliveryAddress(userInfo?.defaultAddress);
        }
    }, [userInfo]);

    const idProductBuyNow = searchParams.get('id');
    const isBuyNow = idProductBuyNow !== null;

    const {
        data: checkoutProducts,
        setData: setCheckoutProducts,
        loaded,
    } = request.useAxios({ url: route.cartAPI, isAuthen: true });

    useEffect(() => {
        let price = 0;
        console.log(checkoutProducts);
        checkoutProducts?.forEach((product) => {
            price += product.productVariation.discount
                ? product.productVariation.price -
                  (product.productVariation.price * product.productVariation.discount) / 100
                : product.productVariation.price;
        });

        setOrderSummary(price);
    }, [checkoutProducts]);

    useEffect(() => {
        if (deliveryAddress) {
            addressService
                .getShipFee({
                    to_district_id: deliveryAddress?.ward.district.districtID,
                    to_ward_code: deliveryAddress?.ward.wardCode,
                })
                .then((res) => {
                    console.log(res);
                    setShipFee(res.data.total);
                });
        }
    }, [deliveryAddress]);

    const handleCheckout = async () => {
        const params = {
            address: deliveryAddress.addressString,
            receiverName: deliveryAddress.receiverName,
            receiverPhone: deliveryAddress.receiverPhone,
            paymentMethod: paymentMethod - 1,
            shipPrice: shipFee,
            toDistrict: deliveryAddress.ward.district.districtID,
            products: checkoutProducts.map((item) => {
                return { id: item.productVariation.id, quantity: item.quantity };
            }),
        };
        try {
            const res = await request.post(route.orderAPI, params);
            if (paymentMethod === 1) {
                setMessage({ text: 'Checkout success', severity: 'success', type: AlertTypes.SNACKBAR_LARGE });
                setShowMessage(true);
                setCheckoutProducts([]);
                navigate('/order');
            } else if (paymentMethod === 2) {
                console.log(res);
                window.location.href = `${res.data.data.payUrl}`;
            }
        } catch (error) {
            console.log(error);
            setMessage({
                severity: 'error',
                text:
                    error?.response?.data?.message ||
                    error?.response?.data?.errors[0] ||
                    'Checkout failed. Please try again later',
                type: AlertTypes.SNACKBAR_LARGE,
            });
            setShowMessage(true);
        }
    };

    const handleToggleModal = () => {
        setShowListAddressDialog(!showListAddressDialog);
    };

    const renderCheckoutItems = () => {
        if (isBuyNow) {
            return checkoutProducts.map((item, index) => (
                <CheckOutItem
                    key={index}
                    avatar={item.productVariation.avatar.url}
                    idProduct={item.productDetail.id}
                    price={
                        item.productVariation.discount
                            ? item.productVariation.price - (item.productVariation.price * item.discount) / 100
                            : item.productVariation.price
                    }
                    productName={item.productDetail.name}
                    productVariationName={item.productVariation.variationName}
                    quantity={item.quantity}
                />
            ));
        } else if (checkoutProducts.length > 0)
            return checkoutProducts.map((item, index) => (
                <CheckOutItem
                    key={index}
                    avatar={item.productVariation.avatar.url}
                    idProduct={item.productVariation.product.id}
                    price={
                        item.productVariation.discount
                            ? item.productVariation.price -
                              (item.productVariation.price * item.productVariation.discount) / 100
                            : item.productVariation.price
                    }
                    productName={item.productVariation.product.name}
                    productVariationName={item.productVariation.variationName}
                    quantity={item.quantity}
                />
            ));
        else return <Typography variant="h5">{labels.noProducts}</Typography>;
    };

    const header = document.getElementById('header');

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
                        <Box
                            width="100%"
                            height="auto"
                            p={2}
                            sx={{
                                boxShadow: 1,
                                bgcolor: 'background.white',
                                position: 'sticky',
                                top: header?.clientHeight + 5,
                            }}
                        >
                            <Typography variant="h6">{labels.deliveryAddress}</Typography>
                            {deliveryAddress ? (
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <DeliveryAddressItem address={deliveryAddress} />
                                    <Button
                                        variant="contained"
                                        onClick={handleToggleModal}
                                        sx={{ alignSelf: 'center', ml: 2 }}
                                    >
                                        {labels.changeDeliveryAddress}
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
                        <Grid2
                            item
                            xs={12}
                            md={6}
                            display="flex"
                            direction="column"
                            component={Stack}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            bgcolor="background.default"
                        >
                            <Box display="flex" flexDirection="column">
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6">{labels.orderSummary}: </Typography>
                                    <Typography variant="h5" ml={2}>
                                        {commas(orderSummary || 0)}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6">{labels.shipFee}: </Typography>
                                    <Typography variant="h5" ml={2}>
                                        {commas(shipFee || 0)}
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" mt={2}>
                                    <Typography variant="h6" color="primary">
                                        {labels.total}:{' '}
                                    </Typography>
                                    <Typography variant="h5" ml={2}>
                                        {commas(orderSummary + shipFee || 0)}
                                    </Typography>
                                </Box>
                            </Box>
                            <div>
                                <Button LinkComponent={Link} to={route.home.path} size="large" variant="outlined">
                                    {labels.addMoreProducts}
                                </Button>
                                <Button size="large" variant="contained" onClick={handleCheckout}>
                                    {labels.order}
                                </Button>
                            </div>
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
            {showListAddressDialog && (
                <ListAddressDialog
                    selected={deliveryAddress}
                    handleClose={handleToggleModal}
                    handleSaveDeliveryAddress={setDeliveryAddress}
                />
            )}
        </>
    );
};

export default Checkout;
