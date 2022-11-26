import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { route } from '~/config';
import { commas } from '~/utils/formater';

const OrderDetailItem = ({ item }) => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={1} display="flex">
                    <Box
                        component="img"
                        src={item?.productVariation.product.avatar}
                        alt=""
                        height={80}
                        width="100%"
                        sx={{ objectFit: 'cover' }}
                    />
                </Grid>
                <Grid item xs={8} display="flex" alignItems="center">
                    <Typography
                        variant="h5"
                        component={Link}
                        to={route.singleProductAPI + item?.productVariation.product.id}
                        width="100%"
                        sx={{ overflowWrap: 'break-word' }} // word break for long text
                    >
                        {item?.productVariation.product.name}
                    </Typography>
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography>{commas(item?.productVariation.price || 0)} đ</Typography>
                    {/* quantity */}
                </Grid>
                <Grid item xs={1} display="flex" alignItems="center">
                    <Typography px={2}>3</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderDetailItem;
