import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { CartItemSkeleton } from '~/components/Skeleton';
import { route } from '~/config';
import { GlobalContext } from '~/context/GlobalContext';
import { cart as cartConfig } from '~/config';
import CartItem from '~/layouts/components/CartItem/CartItem';
import { commas } from '~/utils/formater';
import * as request from '~/utils/httpRequest';
import Title from '~/components/Title/Title';

const Cart = ({ title }) => {
    const labels = cartConfig.labels;

    const { setTotalCartItem } = useContext(GlobalContext);

    const [totalPrice, setTotalPrice] = useState(0);

    const {
        data: cartProducts,
        setData: setCartProducts,
        loaded,
    } = request.useAxios({ url: route.cartAPI, isAuthen: true });

    useEffect(() => {
        if (loaded) {
            let total = 0;
            let price = 0;
            cartProducts.forEach((item) => {
                total += item.quantity;
                price += item.productVariation.price * item.quantity;
            });
            setTotalCartItem(total);
            setTotalPrice(price);
        }
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
                quantity: newQuantity - quantity,
            };
            request.patch(`${route.cartAPI}/${id}`, data).then((res) => {
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
            });
        }
    };

    const renderCartItem = () => {
        if (cartProducts?.length > 0)
            return cartProducts.map((item, index) => (
                <CartItem key={index} item={item} onDelete={removeItem} onChange={updateQuantity} />
            ));
        else return <Typography variant="h6">{labels.noItem}</Typography>;
    };

    return (
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
                            <Button LinkComponent={Link} to={route.checkout.path} size="large" variant="contained">
                                {labels.checkout}
                            </Button>
                        </div>
                    </div>
                </Box>
            </Box>
        </Title>
    );
};

export default Cart;
