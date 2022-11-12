import { Box, Button, Divider, Skeleton, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import CartItem from '~/layouts/components/CartItem/CartItem';
import * as request from '~/utils/httpRequest';
import { route } from '~/config';
import { GlobalContext } from '~/context/GlobalContext';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);

    const { totalCartItem, setTotalCartItem } = useContext(GlobalContext);

    const [totalPrice, setTotalPrice] = useState(0);

    const [loading, setLoading] = useState(false);

    const getCartProducts = async () => {
        setLoading(true);
        const res = await request.get(route.cartAPI);
        setCartProducts(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        getCartProducts();
    }, []);

    useEffect(() => {
        let total = 0;
        let price = 0;
        cartProducts.forEach((item) => {
            total += item.quantity;
            price += item.productVariation.price * item.quantity;
        });
        setTotalCartItem(total);
        setTotalPrice(price);
    }, [cartProducts]);

    const removeItem = async (id) => {
        const res = await request.delete(`${route.cartAPI}/${id}`);
        if (res.status === 200) {
            setCartProducts(cartProducts.filter((item) => item.productVariation.id !== id));
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
                quantity: newQuantity,
            };
            request.put(`${route.cartAPI}/${id}`, data);
            setCartProducts(
                cartProducts.map((item) => {
                    if (item.productVariation.id === id) {
                        item.quantity = newQuantity;
                    }
                    return item;
                }),
            );
        }
    };

    return (
        <Box my={3} display="flex" flexDirection="column" alignItems="center">
            <Box width="100%" p={2} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                {/* List Cart Items */}
                <Stack spacing={1} divider={<Divider />}>
                    {!loading ? (
                        cartProducts.length > 0 ? (
                            cartProducts.map((item, index) => (
                                <CartItem key={index} item={item} onDelete={removeItem} onChange={updateQuantity} />
                            ))
                        ) : (
                            <Typography variant="h6">No items in cart</Typography>
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
                        <p>Bạn đang có {totalCartItem} sản phẩm trong giỏ hàng</p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền:</span> <span>{totalPrice} d</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button LinkComponent={Link} to={route.home} size="large" variant="outlined">
                            Tiếp tục mua hàng
                        </Button>
                        <Button LinkComponent={Link} to={route.checkout} size="large" variant="contained">
                            Đặt hàng
                        </Button>
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default Cart;
