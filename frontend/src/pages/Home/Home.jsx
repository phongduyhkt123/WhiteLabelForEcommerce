import { Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import ScrollToTop from '~/components/ScrollToTop';
import Title from '~/components/Title/Title';
import { GlobalContext } from '~/context/GlobalContext';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import { SliderCarousel } from '~/layouts/components/Slider';
import * as request from '~/utils/httpRequest';
import SlideBanner from './SlideBanner';
import { ConfigContext } from '~/context/ConfigContext';

function Home({ title }) {
    const config = useContext(ConfigContext);
    const home = config?.home;

    const { isMobile } = useContext(GlobalContext);

    const [groupProducts, setGroupProducts] = useState([]);

    const getProducts = async (groupProduct, index) => {
        const res = await request.get(groupProduct.api);
        groupProduct.data = res.data.data;
        groupProducts[index] = groupProduct;
        setGroupProducts([...groupProducts]);
    };

    useEffect(() => {
        home?.groupProducts.forEach((groupProduct, index) => {
            getProducts(groupProduct, index);
        });
    }, [home]);

    return (
        <Title title={title}>
            <Box width="100%" display="flex" flexDirection="column" alignItems="center" margin="auto">
                {/* Banner */}
                <SlideBanner images={home?.topBanner.images || []} height={home?.topBanner.height} />

                <Box width="100%" mt={8}>
                    <Stack spacing={2}>
                        {/* show group product */}
                        {home?.groupProducts.map((group, index) => (
                            <Paper sx={{ px: 0.5, py: 2, bgcolor: 'background.default' }} key={index}>
                                <Typography variant="h5" color="primary">
                                    {home?.labels[group.title]}
                                </Typography>
                                {/* Banner */}
                                <Box
                                    component="img"
                                    sx={{
                                        display: 'block',
                                        objectFit: 'cover',
                                        width: '100%',
                                        mb: '-10rem',
                                    }}
                                    height="30rem"
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
