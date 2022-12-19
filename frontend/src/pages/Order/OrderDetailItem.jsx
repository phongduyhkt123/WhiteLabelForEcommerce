import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { route } from '~/config';
import { commas } from '~/utils/formater';

const OrderDetailItem = ({ item }) => {
    return (
        <Box>
            <Grid container width="100%" height="100%" direction="row" spacing="0.5rem">
                {/* image */}
                <Grid item xs={3} md={2} height="100%" display="flex">
                    <Box
                        component="img"
                        src={item.productVariation.product.avatar}
                        alt=""
                        width="100%"
                        maxWidth="10rem"
                        margin="auto"
                        sx={{ objectFit: 'contain', aspectRatio: '1/1' }}
                    />
                </Grid>
                {/* info */}
                <Grid item xs={9} md={10} container display="flex" justifyContent="space-around" alignItems="center">
                    <Grid item xs={12} md={5}>
                        <Typography
                            component={Link}
                            variant="body1"
                            to={`${route.product.path}/${item.productVariation.product.id}`}
                        >
                            {item.productVariation.product.name}
                        </Typography>
                        <Typography variant="body1">variant: {item.productVariation.variationName}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography textAlign="center">{commas(item.unitPrice)}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2} justifyContent="center" alignItems="center" display="flex">
                        Qt:
                        {/* quantity */}
                        <Typography px={2}>{item.quantity}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderDetailItem;
