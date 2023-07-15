import { Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import person from 'src/assets/animations/businessman-holding-coffee.json';

import ScrollToTop from '~/components/ScrollToTop';
import Title from '~/components/Title/Title';
import { GlobalContext } from '~/context/GlobalContext';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import { SliderCarousel } from '~/layouts/components/Slider';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import * as request from '~/utils/httpRequest';
import SlideBanner from './SlideBanner';
import { ConfigContext } from '~/context/ConfigContext';
import { motion } from 'framer-motion';

function Home({ title }) {
    const { home } = useContext(ConfigContext);

    const { isMobile } = useContext(GlobalContext);

    const [groupProducts, setGroupProducts] = useState([]);

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (isVisible) {
            return;
        }

        setIsVisible(true);
    };

    const getProducts = async (groupProduct, index) => {
        const res = await request.get(groupProduct.api);
        groupProduct.data = res.data.data;
        groupProducts[index] = groupProduct;
        setGroupProducts([...groupProducts]);
    };

    useEffect(() => {
        home.groupProducts.forEach((groupProduct, index) => {
            getProducts(groupProduct, index);
        });
    }, [home]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Title title={title}>
                <Box width="100%" display="flex" flexDirection="column" alignItems="center" margin="auto">
                    {/* Banner */}
                    <Box width={home.topBanner.width} position="relative" display={home.topBanner.display}>
                        <SlideBanner images={home.topBanner.images || []} height={home.topBanner.height} />
                    </Box>
                    {/* <Lottie animationData={person} style={{ height: 200 }} /> */}
                    <Box width="100%" mt={8}>
                        <Stack spacing={2}>
                            {/* show group product */}
                            {home.groupProducts.map((group, index) => (
                                <Paper sx={{ px: 0.5, py: 2, bgcolor: 'background.default' }} key={index}>
                                    <Typography variant="h5" color="primary">
                                        {home.labels[group.title]}
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
                                        <AnimatedOnScroll animationIn="bounceInLeft" onScroll={handleScroll}>
                                            <SliderCarousel isMobile={isMobile} slidesToShow={group.slidesToShow}>
                                                {group?.data?.map((item, index) => (
                                                    <ProductCard key={index} data={item} />
                                                ))}
                                            </SliderCarousel>
                                        </AnimatedOnScroll>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                    </Box>
                </Box>
                <ScrollToTop />
            </Title>
        </motion.div>
    );
}

export default Home;
