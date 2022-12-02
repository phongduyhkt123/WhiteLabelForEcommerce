import { ShoppingCart } from '@mui/icons-material';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { route } from '~/config';
import { commas } from '~/utils/formater';

export const ProductCard = ({ data }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea LinkComponent={Link} to={route.singleProduct.replace(':id', data?.id)}>
                <Box sx={{ m: 0.2, overflow: 'hidden' }}>
                    {/* image */}
                    <CardMedia
                        component="img"
                        image={data?.avatar}
                        alt="green iguana"
                        height={200}
                        sx={{
                            transition: 'transform 1s',
                            ':hover': { transform: 'scale(1.2)' },
                        }}
                    />
                </Box>
                <CardContent>
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
                    <Typography variant="body" color="text.secondary">
                        {commas(data?.minPrice || 0)} đ
                    </Typography>
                </CardContent>
            </CardActionArea>
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
        </Card>
    );
};
