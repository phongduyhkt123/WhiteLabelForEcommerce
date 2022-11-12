import { Alert, Box, Button, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { route } from '~/config';
import { AlertContext } from '~/context/AlertContext';
import CheckoutItem from '~/layouts/components/CheckoutItem/CheckoutItem';
import * as request from '~/utils/httpRequest';

const Checkout = () => {
    const [checkoutProducts, setCheckoutProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('cash');

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
            paymentMethod: 1,
            idProductVariation: checkoutProducts.map((item) => item.productVariation.id),
        };
        try {
            const res = await request.post(route.orderAPI, params);
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
                <Box width="100%" p={2} mt={3} sx={{ boxShadow: 1, bgcolor: 'background.white', borderRadius: 2 }}>
                    {/* Price and checkout */}
                    <div className="cart__info">
                        <div className="cart__info__txt">
                            <div className="cart__info__txt__price">
                                <span>Thành tiền:</span> <span>100000000 d</span>
                            </div>
                        </div>
                        <div className="cart__info__btn">
                            <Button LinkComponent={Link} to={route.home} size="large" variant="outlined">
                                Add more product
                            </Button>
                            <Button size="large" variant="contained" onClick={handleCheckout}>
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </Box>
            </Box>

            <Alert severity={message.severity} open={showMessage} onClose={() => setShowMessage(false)} />
        </>
    );
};

export default Checkout;
