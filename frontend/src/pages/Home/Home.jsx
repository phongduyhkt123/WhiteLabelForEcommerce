import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { AlertContext } from '~/context/AlertContext';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import { SliderCarousel } from '~/layouts/components/Slider';

function Home() {
    const { error } = useContext(AlertContext);

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
                src="https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000"
                alt="image"
            ></Box>

            <Box width="100%" mt={8}>
                {/* show group product */}
                <Box sx={{ py: 4 }}>
                    {/* Banner */}
                    <Typography variant="h4"> Best Seller</Typography>
                    <Box my={4}>
                        <SliderCarousel styles={{ pading: 1 }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                <ProductCard key={index} />
                            ))}
                        </SliderCarousel>
                    </Box>
                </Box>

                <Box>
                    {/* Banner */}
                    <Typography variant="h4"> Title</Typography>
                    <SliderCarousel>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                            <Card key={index}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="https://pbs.twimg.com/media/FW4a6X5aUAEDtOp?format=jpg&name=large"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </SliderCarousel>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;
