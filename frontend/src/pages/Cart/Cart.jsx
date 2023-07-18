import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { CartItemSkeleton } from '~/components/Skeleton';
import { GlobalContext } from '~/context/GlobalContext';
import CartItem from '~/layouts/components/CartItem/CartItem';
import { commas } from '~/utils/formater';
import * as request from '~/utils/httpRequest';
import Title from '~/components/Title/Title';
import { ConfigContext } from '~/context/ConfigContext';
import { motion } from 'framer-motion';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import CustomLoader from '~/components/CustomLoader/CustomLoader';

const Cart = ({ title }) => {
    const { routes: route, cart } = useContext(ConfigContext);
    const labels = cart.labels;

    const [isLoading, setIsLoading] = useState(false);

    const { setMessage, setShowMessage } = useContext(AlertContext);

    const { setTotalCartItem } = useContext(GlobalContext);

    const [totalPrice, setTotalPrice] = useState(0);

    const {
        data: cartProducts,
        setData: setCartProducts,
        loaded,
    } = request.useAxios({ url: route.cartAPI.url, isAuthen: true });

    useEffect(() => {
        if (loaded) {
            let total = 0;
            let price = 0;
            cartProducts.forEach((item) => {
                total += item.quantity;
                price += item.productVariation.discount
                    ? item.productVariation.price - (item.productVariation.price * item.productVariation.discount) / 100
                    : item.productVariation.price;
            });
            setTotalCartItem(total);
            setTotalPrice(price);
        }
    }, [cartProducts]);

    const removeItem = async (id) => {
        try {
            setIsLoading(true);
            const res = await request.delete(`${route.cartAPI.url}/${id}`);
            if (res.status === 200) {
                setCartProducts(cartProducts.filter((item) => item.productVariation.id !== id));
                setMessage({
                    text: 'Xoá sản phẩm thành công',
                    type: AlertTypes.SNACKBAR_LARGE,
                    severity: 'success',
                });
            }
        } catch (err) {
            console.log(err);
            setMessage({
                text: 'Xoá sản phẩm thất bại',
                type: AlertTypes.SNACKBAR_LARGE,
                severity: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = (id, quantity, opt) => {
        let change = false;
        let newQuantity = quantity;

        if (opt === '+') {
            newQuantity += 1;
            change = true;
        }
        if (opt === '-') {
            if (quantity > 1) {
                newQuantity -= 1;
                change = true;
            }
        }
        if (change) {
            const data = {
                quantity: newQuantity - quantity,
            };
            setIsLoading(true);
            request
                .patch(`${route.cartAPI.url}/${id}`, data)
                .then((res) => {
                    if (res.status === 200) {
                        setCartProducts(
                            cartProducts.map((item) => {
                                if (item.productVariation.id === id) {
                                    item.quantity = res.data.data.quantity;
                                }
                                return item;
                            }),
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setMessage({
                        text: err.response?.data?.errors[0] || 'Cập nhật số lượng thất bại',
                        type: AlertTypes.SNACKBAR_LARGE,
                        severity: 'error',
                    });
                    setShowMessage(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const handleCheckout = () => {};

    const renderCartItem = () => {
        if (cartProducts?.length > 0)
            return cartProducts.map((item, index) => (
                <CartItem key={index} item={item} onDelete={removeItem} onChange={updateQuantity} />
            ));
        else return <Typography variant="h6">{labels.noItem}</Typography>;
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {isLoading && (
                <div style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, zIndex: 999999 }}>
                    <Box
                        position="absolute"
                        top="0"
                        right="0"
                        left={0}
                        bottom={0}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        bgcolor="black"
                        sx={{ opacity: 0.5, pointerEvents: 'none', cursor: 'wait' }}
                        style={{ pointerEvents: isLoading ? 'all' : 'none' }}
                    >
                        <CustomLoader />
                    </Box>
                </div>
            )}
            <Title title={title}>
                <Box my={3} display="flex" flexDirection="column" alignItems="center">
                    <Box width="100%" p={2} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                        {/* List Cart Items */}
                        <Stack spacing={1} divider={<Divider />}>
                            {loaded ? renderCartItem() : <CartItemSkeleton />}
                        </Stack>
                    </Box>

                    <Box width="100%" p={2} mt={3} sx={{ boxShadow: 1, bgcolor: 'background.white', borderRadius: 2 }}>
                        {/* Price and checkout */}
                        <div>
                            <div>
                                <div>
                                    <span>{labels.total}:</span> <span>{commas(totalPrice)}</span>
                                </div>
                            </div>
                            <div>
                                <Button LinkComponent={Link} to={route.home.path} size="large" variant="outlined">
                                    {labels.continueShopping}
                                </Button>
                                <Button
                                    LinkComponent={Link}
                                    to={route.checkout.path}
                                    size="large"
                                    variant="contained"
                                    onClick={handleCheckout}
                                >
                                    {labels.checkout}
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Title>
        </motion.div>
    );
};

export default Cart;
