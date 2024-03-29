import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import OldPrice from '~/components/OldPrice';
import { GlobalContext } from '~/context/GlobalContext';
import { commas } from '~/utils/formater';
import { productCard as pConfig, route } from '~/config';
import Icon from '~/config/Store/Icon';

export const ProductCard = ({ data, key }) => {
    const { isMobile } = useContext(GlobalContext);

    return (
        <Card key={key} sx={{ position: 'relative' }}>
            <CardActionArea LinkComponent={Link} to={`${route.product.path}/${data?.id}`}>
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
                    {data.maxDiscount !== 0 && (
                        <OldPrice price={data?.minPrice + (data.maxDiscount / 100) * data.minPrice} />
                    )}

                    <Typography variant="body" color="text.secondary">
                        {commas(data?.minPrice || 0)}
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

            {/* {!isMobile && (
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
                        startIcon={<Icon component={pConfig.addToCart.icon} />}
                        sx={{
                            opacity: 0.7,
                            ':hover': { opacity: 1, backgroundColor: 'white' },
                        }}
                    >
                        {pConfig.addToCart.label}
                    </Button>
                </CardActions>
            )} */}
        </Card>
    );
};
