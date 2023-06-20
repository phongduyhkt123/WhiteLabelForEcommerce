import { Box, Divider, Pagination, Rating, Stack, Typography } from '@mui/material';
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

function SingleProduct() {
    const { routes: route } = useContext(ConfigContext);
    const { id } = useParams();

    const { data: product, loaded } = request.useAxios({ url: `${route.productAPI.url}/${id}` });

    const { isMobile } = useContext(GlobalContext);

    const { home } = useContext(ConfigContext);

    const [relativeProducts, setRelativeProducts] = useState([]);

    console.log(relativeProducts);

    useEffect(() => {
        if (home) {
            request.get(home.groupProducts[0].api).then((res) => {
                console.log(res);
                setRelativeProducts(res.data.data);
            });
        }
    }, [home]);

    return (
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
            <Grid2 container spacing={2} my={10} mx="auto">
                <Typography variant="h3" color="primary" m="auto">
                    Đánh giá sản phẩm
                </Typography>
                <Box width="100%">
                    <Box width="60%">
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" my={5}>
                            <Rating name="simple-controlled" value={5} readOnly sx={{ p: 4 }} />
                            <Stack spacing={1}>
                                <Rating name="simple-controlled" size="small" value={5} readOnly />
                                <Rating name="simple-controlled" size="small" value={4} readOnly />
                                <Rating name="simple-controlled" size="small" value={3} readOnly />
                                <Rating name="simple-controlled" size="small" value={2} readOnly />
                                <Rating name="simple-controlled" size="small" value={1} readOnly />
                            </Stack>
                        </Box>
                    </Box>
                </Box>

                {/* user comment */}
                <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                    <Stack spacing={2} mb={2} ml={8} divider={<Divider color="primary" />} width="80%">
                        <Comment name="Nguyễn Văn A" rating={5} content="Đã mua sản phẩm này" />
                        <Comment name="Nguyễn Văn A" rating={5} content="Đã mua sản phẩm này" />
                    </Stack>
                    <Pagination count={10} variant="outlined" shape="rounded" color="primary" />
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" width="100%" mt={10}>
                    <Typography variant="h3" color="primary" m="auto">
                        Sản phẩm liên quan
                    </Typography>
                    {/* List product */}
                    <Box my={2} px={isMobile ? 0 : 3} width="100%">
                        <SliderCarousel isMobile={isMobile}>
                            {relativeProducts.map((item, index) => {
                                console.log('first', item);
                                return <ProductCard key={index} data={item} />;
                            })}
                        </SliderCarousel>
                    </Box>
                </Box>
            </Grid2>
        </Box>
    );
}

export default SingleProduct;
