import { Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import ScrollToTop from '~/components/ScrollToTop';
import { home } from '~/config';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import { SliderCarousel } from '~/layouts/components/Slider';
import * as request from '~/utils/httpRequest';

function Home() {
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
        <>
            <Box width="100%" display="flex" flexDirection="column" alignItems="center" margin="auto">
                {/* Banner */}
                <Box
                    component="img"
                    sx={{
                        height: 500,
                        display: 'block',
                        objectFit: 'cover',
                        width: '100%',
                    }}
                    src={home.topBanner.images[0].src}
                    alt="image"
                ></Box>

                <Box width="100%" mt={8}>
                    <Stack spacing={2}>
                        {/* show group product */}
                        {home.groupProducts.map((group, index) => (
                            <Paper sx={{ p: 4 }} key={index}>
                                <Typography variant="h4"> {group.title}</Typography>
                                {/* Banner */}
                                <Box
                                    component="img"
                                    sx={{ height: 200, display: 'block', objectFit: 'cover', width: '100%' }}
                                    {...group.banner}
                                ></Box>
                                {/* List product */}
                                <Box my={4}>
                                    <SliderCarousel styles={{ pading: 1 }}>
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
        </>
    );
}

export default Home;
