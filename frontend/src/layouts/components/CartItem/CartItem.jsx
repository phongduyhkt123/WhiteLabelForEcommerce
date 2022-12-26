import PropTypes from 'prop-types';
import { useRef } from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';

import { Add, DeleteForeverOutlined, Remove } from '@mui/icons-material';
import { route, cart } from '~/config';
import { commas } from '~/utils/formater';

/// Set time out when update quantity
const CartItem = ({ item, canControl = true, onDelete = () => {}, onChange = () => {} }) => {
    const itemRef = useRef(null);

    console.log(item);

    return (
        <Box ref={itemRef}>
            <Grid2 container width="100%" height="100%" direction="row" columnSpacing={2} alignItems="center">
                {/* image */}
                <Grid2 item xs={3} md={2} height="100%" display="flex" bgcolor="background.default">
                    <Box
                        component="img"
                        src={item.productVariation.avatar?.url}
                        alt=""
                        width="100%"
                        maxWidth="10rem"
                        margin="auto"
                        sx={{ objectFit: 'contain', aspectRatio: '1/1' }}
                    />
                </Grid2>
                {/* info */}
                <Grid2
                    item
                    xs={canControl ? 8 : 9}
                    md={canControl ? 9 : 10}
                    container
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Grid2 item xs={12} md={5}>
                        <Typography
                            component={Link}
                            variant="body1"
                            to={`${route.product.path}/${item.productVariation.product.id}`}
                        >
                            {item.productVariation.product.name}
                        </Typography>
                        <Typography variant="body1">
                            {cart.labels.variant}: {item.productVariation.variationName}
                        </Typography>
                    </Grid2>
                    <Grid2
                        item
                        xs={6}
                        md={3}
                        alignSelf="stretch"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography textAlign="center">{commas(item.productVariation.price)}</Typography>
                    </Grid2>
                    <Grid2 item xs={6} md={2} justifyContent="center" alignItems="center" display="flex">
                        {cart.labels.quantity}:{/* quantity */}
                        {canControl && (
                            <IconButton onClick={() => onChange(item.productVariation.id, item.quantity, '-')}>
                                <Remove />
                            </IconButton>
                        )}
                        <Typography px={2}>{item.quantity}</Typography>
                        {canControl && (
                            <IconButton onClick={() => onChange(item.productVariation.id, item.quantity, '+')}>
                                <Add />
                            </IconButton>
                        )}
                    </Grid2>
                </Grid2>
                {/* Delete */}
                {canControl && (
                    <Grid2 item xs={1} display="flex" alignItems="center" justifyContent="center">
                        <IconButton color="danger" onClick={() => onDelete(item.productVariation.id)}>
                            <DeleteForeverOutlined />
                        </IconButton>
                    </Grid2>
                )}
            </Grid2>
        </Box>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;
