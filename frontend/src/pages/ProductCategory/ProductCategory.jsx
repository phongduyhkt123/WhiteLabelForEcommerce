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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const ProductCategory = ({ title }) => {
    const { routes: route, cart } = useContext(ConfigContext);
    const labels = cart.labels;

    const { data: categories, loaded } = request.useAxios({ url: route.categoryAPI.url });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Title title={title}>
                <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                        Categories
                    </Typography>
                </Box>

                <Box m={10} display="flex" flexDirection="column" alignItems="center">
                    <Grid2 container spacing={5}>
                        {loaded ? (
                            categories.map((category, index) => (
                                <Grid2 item xs={6} sm={4} md={3} lg={3} key={index}>
                                    <Link to={'/'} key={index} style={{ textDecoration: 'none' }}>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <Box
                                                width="100%"
                                                height="100%"
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{
                                                    '&:hover': {
                                                        opacity: 0.8,
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={
                                                        'https://th.bing.com/th/id/OIP.AkrIjeCJC5r88JQ_xzoXHgHaGt?pid=ImgDet&rs=1'
                                                    }
                                                    alt={'category'}
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </Box>
                                            <Box
                                                width="100%"
                                                height="100%"
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{
                                                    '&:hover': {
                                                        opacity: 0.8,
                                                    },
                                                }}
                                            >
                                                <Typography variant="h6">{category.name}</Typography>
                                            </Box>
                                        </Box>
                                    </Link>
                                </Grid2>
                            ))
                        ) : (
                            <CartItemSkeleton />
                        )}
                    </Grid2>
                </Box>
            </Title>
        </motion.div>
    );
};

export default ProductCategory;
