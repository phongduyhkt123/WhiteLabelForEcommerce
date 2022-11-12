import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, IconButton, Typography } from '@mui/material';

import { DeleteForeverOutlined, Add, Remove } from '@mui/icons-material';
import { route } from '~/config';
import * as request from '~/utils/httpRequest';

/// Set time out when update quantity
const CartItem = ({ item, onDelete, onChange }) => {
    const itemRef = useRef(null);

    // const [item, setItem] = useState(1);

    // useEffect(() => {
    //     setItem(props.item);
    //     setQuantity(props.item.quantity);
    // }, [props.item]);

    // const updateCartItem = () => {
    //     dispatch(updateItem({...item, quantity: quantity}))
    // }

    return (
        <Box ref={itemRef} height={130}>
            <Grid2 container width="100%" height="100%" direction="row">
                {/* image */}
                <Grid2 item xs={2} height="100%" display="flex">
                    <Box
                        component="img"
                        src={item.productDetail.avatar}
                        alt=""
                        height="100%"
                        width="100%"
                        margin="auto"
                        sx={{ objectFit: 'cover' }}
                    />
                </Grid2>
                {/* info */}
                <Grid2 item xs={9} container display="flex" justifyContent="space-around" alignItems="center">
                    <Grid2 item xs={5}>
                        <Typography
                            component={Link}
                            variant="h5"
                            to={route.singleProduct.replace(':id', item.productDetail.id)}
                        >
                            {item.productDetail.name}
                        </Typography>
                    </Grid2>
                    <Grid2 item xs={3}>
                        <Typography textAlign="center">{item.productVariation.price} VND</Typography>
                    </Grid2>
                    <Grid2 item xs={2}>
                        {/* quantity */}
                        <Box display="flex" alignItems="center">
                            <IconButton onClick={() => onChange(item.productVariation.id, item.quantity, '-')}>
                                <Remove />
                            </IconButton>
                            <Typography px={2}>{item.quantity}</Typography>
                            <IconButton onClick={() => onChange(item.productVariation.id, item.quantity, '+')}>
                                <Add />
                            </IconButton>
                        </Box>
                    </Grid2>
                </Grid2>
                {/* Delete */}
                <Grid2 item xs={1} display="flex" alignItems="center" justifyContent="center">
                    <IconButton color="danger" size="large" onClick={() => onDelete(item.productVariation.id)}>
                        <DeleteForeverOutlined sx={{ fontSize: '3rem' }} />
                    </IconButton>
                </Grid2>
            </Grid2>
        </Box>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;
