import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '~/context/AlertContext';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import { SliderCarousel } from '~/layouts/components/Slider';
import { home } from '~/config';
import * as request from '~/utils/httpRequest';

function Home() {
    const [groupProducts_, setGroupProducts_] = useState(home.groupProducts);

    const getProducts = async (groupProduct, index) => {
        const res = await request.get(groupProduct.api);
        groupProduct.data = res.data.data;
        groupProducts_[index] = groupProduct;
        setGroupProducts_([...groupProducts_]);
    };

    useEffect(() => {
        groupProducts_.forEach((groupProduct, index) => {
            getProducts(groupProduct, index);
        });
    }, []);

    return (
        <Box width="90%" display="flex" flexDirection="column" alignItems="center" margin="auto">
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
                {/* show group product */}
                {home.groupProducts.map((group, index) => (
                    <Box sx={{ py: 4 }} key={index}>
                        {/* Banner */}
                        <Typography variant="h4"> {group.title}</Typography>
                        <Box my={4}>
                            <SliderCarousel styles={{ pading: 1 }}>
                                {group?.data?.map((item, index) => (
                                    <ProductCard key={index} data={item} />
                                ))}
                            </SliderCarousel>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Home;
