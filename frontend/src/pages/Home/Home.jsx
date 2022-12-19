import { Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import ScrollToTop from '~/components/ScrollToTop';
import Title from '~/components/Title/Title';
import { home } from '~/config';
import { GlobalContext } from '~/context/GlobalContext';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import { SliderCarousel } from '~/layouts/components/Slider';
import * as request from '~/utils/httpRequest';
import SlideBanner from './SlideBanner';

function Home() {
    const { isMobile } = useContext(GlobalContext);

    const [groupProducts, setGroupProducts] = useState(home.groupProducts);

    const getProducts = async (groupProduct, index) => {
        const res = await request.get(groupProduct.api);
        groupProduct.data = res.data.data;
        groupProducts[index] = groupProduct;
        setGroupProducts([...groupProducts]);
    };

    useEffect(() => {
        groupProducts.forEach((groupProduct, index) => {
            getProducts(groupProduct, index);
        });
    }, []);

    return (
        <Title title="Home">
            <Box width="100%" display="flex" flexDirection="column" alignItems="center" margin="auto">
                {/* Banner */}
                <SlideBanner images={home.topBanner.images} />

                <Box width="100%" mt={8}>
                    <Stack spacing={2}>
                        {/* show group product */}
                        {home.groupProducts.map((group, index) => (
                            <Paper sx={{ px: 0.5, py: 2, bgcolor: 'background.default' }} key={index}>
                                <Typography variant="h5" color="primary">
                                    {group.title}
                                </Typography>
                                {/* Banner */}
                                <Box
                                    component="img"
                                    sx={{
                                        height: '30rem',
                                        display: 'block',
                                        objectFit: 'cover',
                                        width: '100%',
                                        mb: '-10rem',
                                    }}
                                    {...group.banner}
                                ></Box>
                                {/* List product */}
                                <Box my={2} px={isMobile ? 0 : 3}>
                                    <SliderCarousel isMobile={isMobile}>
                                        {group?.data?.map((item, index) => (
                                            <ProductCard key={index} data={item} />
                                        ))}
                                    </SliderCarousel>
                                </Box>
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            </Box>
            <ScrollToTop />
        </Title>
    );
}

export default Home;
