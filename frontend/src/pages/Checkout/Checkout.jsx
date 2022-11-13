import { Alert, Box, Button, Divider, Select, Skeleton, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import PaymentMethodItem from '~/components/PaymentMethodItem/PaymentMethodItem';
import { route, paymentMethods } from '~/config';
import { AlertContext } from '~/context/AlertContext';
import CheckoutItem from '~/layouts/components/CheckoutItem/CheckoutItem';
import * as request from '~/utils/httpRequest';

const Checkout = () => {
    const [checkoutProducts, setCheckoutProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState(1);

    const { message, setMessage, showMessage, setShowMessage } = useContext(AlertContext);

    const getCheckoutProducts = async () => {
        setLoading(true);
        const res = await request.get(route.cartAPI);
        setCheckoutProducts(res.data.data);
        setLoading(false);
    };

    const handleCheckout = async () => {
        const params = {
            idAddress: 1,
            note: 'note',
            paymentMethod: paymentMethod - 1,
            idProductVariations: checkoutProducts.map((item) => item.productVariation.id),
        };
        try {
            const res = await request.post(route.orderFromCartAPI, params);
            if (res.status === 200 && paymentMethod === 1) {
                setMessage({ text: 'Checkout success', severity: 'success' });
                setShowMessage(true);
                setCheckoutProducts([]);
            }
        } catch (error) {
            setMessage({
                severity: 'error',
                text: error.response.data.message,
            });
            setShowMessage(true);
        }
    };

    const handleOpenModal = () => {};

    useEffect(() => {
        getCheckoutProducts();
    }, []);

    return (
        <>
            <Box my={3} display="flex" flexDirection="column" alignItems="center">
                <Box width="100%" p={2} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                    {/* List checkout Items */}
                    <Stack spacing={1} divider={<Divider />}>
                        {!loading ? (
                            checkoutProducts.length > 0 ? (
                                checkoutProducts.map((item, index) => <CheckoutItem key={index} item={item} />)
                            ) : (
                                <Typography variant="h6">Nothing to checkout</Typography>
                            )
                        ) : (
                            // Skeleton
                            <Stack spacing={1}>
                                {/* For variant="text", adjust the height via font-size */}
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                {/* For other variants, adjust the size with `width` and `height` */}
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="rectangular" width={210} height={60} />
                                <Skeleton variant="rounded" width={210} height={60} />
                            </Stack>
                        )}
                    </Stack>
                </Box>
                {/* delivery address */}
                <Box width="100%" p={2} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                    <Typography variant="h5">Delivery Address</Typography>
                    <Typography variant="h6">Pham Phong Duy 8034350394</Typography>
                    <Typography variant="h6">Address 1</Typography>
                    <Typography variant="h6">Default</Typography>
                    <Button variant="outlined" onClick={handleOpenModal}>
                        Change
                    </Button>
                </Box>
                {/* checkout and payment method */}
                <Box width="100%" p={2} mt={3} sx={{ boxShadow: 1, bgcolor: 'background.white', borderRadius: 2 }}>
                    <Grid2 container>
                        {/* payment method */}
                        <Grid2 item xs={5}>
                            <Typography variant="h6">Payment method</Typography>
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
                        <Grid2 item xs={7} display="flex" justifyContent="center">
                            <div>
                                <div className="cart__info__txt">
                                    <Typography>Thành tiền:</Typography> <Typography>100000000 d</Typography>
                                </div>
                                <div>
                                    <Button LinkComponent={Link} to={route.home} size="large" variant="outlined">
                                        Add more product
                                    </Button>
                                    <Button size="large" variant="contained" onClick={handleCheckout}>
                                        Đặt hàng
                                    </Button>
                                </div>
                            </div>
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
            {showMessage && (
                <Alert severity={message.severity} onClose={() => setShowMessage(false)}>
                    {message.text}
                </Alert>
            )}
        </>
    );
};

export default Checkout;
