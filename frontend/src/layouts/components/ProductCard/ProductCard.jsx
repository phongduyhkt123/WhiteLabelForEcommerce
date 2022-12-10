import { ShoppingCart } from '@mui/icons-material';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import OldPrice from '~/components/OldPrice';
import { route } from '~/config';
import { GlobalContext } from '~/context/GlobalContext';
import { commas } from '~/utils/formater';

export const ProductCard = ({ data }) => {
    const { isMobile } = useContext(GlobalContext);

    return (
        <Card sx={{ position: 'relative' }}>
            <CardActionArea LinkComponent={Link} to={`${route.product}/${data?.id}`}>
                <Box sx={{ m: 0.2, overflow: 'hidden' }}>
                    {/* image */}
                    <CardMedia
                        component="img"
                        image={data?.avatar}
                        alt="green iguana"
                        sx={{
                            transition: 'transform 1s',
                            ':hover': { transform: 'scale(1.2)' },
                            aspectRatio: '1/1',
                        }}
                    />
                </Box>
                <CardContent sx={{ p: 1 }}>
                    <Box sx={{ height: '5rem' }}>
                        <Typography
                            variant="body1"
                            // limit to 2 lines
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {data?.name}
                        </Typography>
                    </Box>
                    {data.maxPrice !== data.minPrice && <OldPrice price={data.maxPrice} />}

                    <Typography variant="body" color="text.secondary">
                        {commas(data?.minPrice || 0)} đ
                    </Typography>
                </CardContent>
            </CardActionArea>

            {/* discount */}
            {data.maxDiscount !== 0 && (
                <Typography
                    variant="body"
                    color="text.secondary"
                    p={0.5}
                    borderRadius="45%"
                    sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'red' }}
                >
                    -{data.maxDiscount}%
                </Typography>
            )}

            {!isMobile && (
                <CardActions>
                    <Button
                        variant="contained"
                        LinkComponent={Link}
                        to={data?.variations?.length > 1 ? 'sdfsdf' : '#'}
                        onClick={() => {
                            if (data?.variations?.length === 1) {
                                //add to cart
                            }
                        }}
                        color="secondary"
                        fullWidth
                        startIcon={<ShoppingCart />}
                        sx={{
                            opacity: 0.7,
                            ':hover': { opacity: 1, backgroundColor: 'white' },
                        }}
                    >
                        ADD TO CART
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};
