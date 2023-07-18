import { Box, Divider, Grid, LinearProgress, Pagination, Rating, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom';
import Title from '~/components/Title/Title';
import { ProductProvider } from '~/context/ProductContext';

import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '~/context/ConfigContext';
import * as request from '~/utils/httpRequest';
import Comment from './Comment';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import { SliderCarousel } from '~/layouts/components/Slider';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import { GlobalContext } from '~/context/GlobalContext';
import { motion } from 'framer-motion';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';

function SingleProduct() {
    const { routes: route } = useContext(ConfigContext);
    const { id } = useParams();

    const { data: product, loaded } = request.useAxios({ url: `${route.productAPI.url}/${id}` });

    const { data: comment, loaded: commentLoaded } = request.useAxios({ url: `${route.commentAPI.url}/${id}` });

    const { isMobile } = useContext(GlobalContext);

    const { home } = useContext(ConfigContext);

    const [relativeProducts, setRelativeProducts] = useState([]);

    useEffect(() => {
        if (home) {
            if (true) {
                request.get(`${route.productRecommendAPI.url}/${id}`).then((res) => {
                    setRelativeProducts(res.data.data);
                });
            }

            // request.get(home.groupProducts[0].api).then((res) => {
            //     console.log(res);
            //     setRelativeProducts(res.data.data);
            // });
        }
    }, [home]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box>
                {loaded && (
                    <Title title={product.name}>
                        <Grid2 container spacing={2} my={1} mx="auto">
                            {/* images */}
                            <ProductImages images={[...Object.values(product.allImgVar), ...product.allImgUrl]} />
                            {/* info */}
                            <ProductProvider>
                                <ProductInfo product={product} />
                            </ProductProvider>
                        </Grid2>
                    </Title>
                )}
                <AnimatedOnScroll animationIn="fadeIn" animationOut="fadeOut">
                    <Box display="flex" flexDirection="column" width="100%" my={20}>
                        <Typography variant="h3" color="primary" m="auto">
                            Đánh giá sản phẩm
                        </Typography>

                        {/* user comment */}
                        {/* rating and overal rating */}
                        <Grid2
                            container
                            spacing={2}
                            my={10}
                            width="100%"
                            alignItems="center"
                            justifyContent="space-around"
                        >
                            <Grid2 item xs={12} md={6}>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Typography variant="h6" color="primary" mr={2}>
                                            Đánh giá tổng quát
                                        </Typography>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="h6" color="primary" mr={2}>
                                                    5 ★
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={product?.rating5 || 0}
                                                    sx={{ height: 10, width: 200, borderRadius: 5 }}
                                                />
                                                <Typography variant="body" color="primary" ml={2}>
                                                    {product?.rating5}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="h6" color="primary" mr={2}>
                                                    4 ★
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={product?.rating4 || 0}
                                                    sx={{ height: 10, width: 200, borderRadius: 5 }}
                                                />
                                                <Typography variant="body" color="primary" ml={2}>
                                                    {product?.rating4}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="h6" color="primary" mr={2}>
                                                    3 ★
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={product?.rating3 || 0}
                                                    sx={{ height: 10, width: 200, borderRadius: 5 }}
                                                />
                                                <Typography variant="body" color="primary" ml={2}>
                                                    {product?.rating3}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="h6" color="primary" mr={2}>
                                                    2 ★
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={product?.rating2 || 0}
                                                    sx={{ height: 10, width: 200, borderRadius: 5 }}
                                                />
                                                <Typography variant="body" color="primary" ml={2}>
                                                    {product?.rating2}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="h6" color="primary" mr={2}>
                                                    1 ★
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={product?.rating1 || 0}
                                                    sx={{ height: 10, width: 200, borderRadius: 5 }}
                                                />
                                                <Typography variant="body" color="primary" ml={2}>
                                                    {product?.rating1}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid2>

                            <Grid2 item xs={12} md={6}>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Typography variant="h6" color="primary" mr={2}>
                                            Đánh giá trung bình
                                        </Typography>
                                        <Box display="flex" alignItems="center">
                                            <Typography variant="h3" color="primary" mr={2}>
                                                {product?.averageRating}
                                            </Typography>
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Rating name="read-only" value={5} readOnly />
                                                <Typography variant="body" color="primary" mr={2}>
                                                    {product?.totalRatingTimes} Reviews
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body" color="primary" mr={2}>
                                            Sản phẩm được đánh giá cao bởi người dùng
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid2>
                        </Grid2>

                        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                            {commentLoaded && comment?.data.length > 0 && (
                                <>
                                    <Stack
                                        spacing={2}
                                        mb={2}
                                        ml={8}
                                        mt={8}
                                        divider={<Divider color="primary" />}
                                        width="80%"
                                    >
                                        {comment.data.map((item, index) => {
                                            console.log('item', item);
                                            return (
                                                <Comment
                                                    key={index}
                                                    name={item.fullnameOfUser}
                                                    rating={item.rate}
                                                    content={item.description}
                                                />
                                            );
                                        })}
                                    </Stack>
                                    <Pagination count={10} variant="outlined" shape="rounded" color="primary" />
                                </>
                            )}

                            {commentLoaded && comment?.data?.length === 0 && (
                                <Typography
                                    variant="h5"
                                    color="primary"
                                    mx="auto"
                                    mt={8}
                                    p={4}
                                    bgcolor="background.paper"
                                >
                                    Chưa có đánh giá nào cho sản phẩm này
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </AnimatedOnScroll>

                <AnimatedOnScroll animationIn="fadeIn" animationOut="fadeOut">
                    <Box display="flex" flexDirection="column" alignItems="center" width="100%" mt={10}>
                        <Typography variant="h3" color="primary" m="auto">
                            Các sản phẩm tương tự
                        </Typography>
                        {/* List product */}
                        <Box my={2} px={isMobile ? 0 : 3} width="100%">
                            <SliderCarousel isMobile={isMobile}>
                                {relativeProducts.map((item, index) => {
                                    return <ProductCard key={index} data={item} />;
                                })}
                            </SliderCarousel>
                        </Box>
                    </Box>
                </AnimatedOnScroll>
            </Box>
        </motion.div>
    );
}

export default SingleProduct;
