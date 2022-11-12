import { ShoppingCart } from '@mui/icons-material';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { route } from '~/config';

export const ProductCard = ({ data }) => {
    return (
        <Card
            sx={{
                borderRadius: 2,
            }}
        >
            <Link style={{ width: '100%' }} to={route.singleProduct.replace(':id', data?.id)}>
                <CardActionArea>
                    <Box maxHeight="320px" sx={{ m: 0.5, borderRadius: 2, overflow: 'hidden' }}>
                        <CardMedia
                            component="img"
                            image={data?.avatar}
                            alt="green iguana"
                            sx={{
                                transition: 'transform 1s',
                                ':hover': { transform: 'scale(1.2)' },
                            }}
                        />
                    </Box>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
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
                        <Typography variant="body2" color="text.secondary">
                            {data?.minPrice}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                <Button
                    variant="contained"
                    size="large"
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
