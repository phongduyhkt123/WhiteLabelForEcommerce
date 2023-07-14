import { Add, Remove } from '@mui/icons-material';
import { Button, Chip, IconButton, List, Rating, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { useContext, useEffect } from 'react';
import OldPrice from '~/components/OldPrice';
import { ProductContext } from '~/context/ProductContext';
import { commas } from '~/utils/formater';
import ButtonControll from './ButtonControll';
import ProductDescription from './ProductDescription';
import { ConfigContext } from '~/context/ConfigContext';

const ProductInfo = ({ product }) => {
    const { quantity, setQuantity, variant, setVariant } = useContext(ProductContext);

    const { singleProduct } = useContext(ConfigContext);

    const labels = singleProduct.labels;

    const updateQuantity = (type) => {
        type === 'plus' ? setQuantity(quantity + 1) : setQuantity(() => (quantity - 1 < 1 ? 1 : quantity - 1));
    };

    useEffect(() => {
        const variations = product.variations;
        if (variations.length === 1) {
            setVariant({
                id: variations[0].id,
                price: variations[0].price,
                discount: variations[0].discount,
                quantity: variations[0].availableQuantity,
            });
        }
    }, []);

    return (
        <Grid2 xs={12} md={6}>
            <Stack spacing={3}>
                <Typography variant="h5">{product.name}</Typography>
                {/* numbers of sold  */}
                <Typography variant="body2" display="inline-block" paddingRight={2}>
                    {labels.sold}: {product?.nsold}
                </Typography>
                <Rating name="simple-controlled" size="large" value={5} onChange={(event, newValue) => {}} />
                <Box bgcolor="background.default" p={2} m={1} display="flex" alignItems="center">
                    {variant && variant?.discount !== 0 && <OldPrice price={variant?.price || product.maxPrice || 0} />}
                    <Typography variant="h5" display="inline">
                        {commas(Math.round(variant?.price * (1 - variant?.discount / 100) || product.minPrice || 0))}
                    </Typography>
                    {variant && variant?.discount !== 0 && (
                        <Chip label={`-${variant.discount}%`} color="primary" sx={{ ml: 2 }}></Chip>
                    )}
                </Box>

                {/* variants */}
                {product.variations.length > 1 && (
                    <div>
                        <Typography variant="h6">{labels.variant}</Typography>
                        <Grid2 container spacing={2}>
                            {product.variations.map((item) => (
                                <Grid2 key={item.id}>
                                    <Button
                                        variant={variant?.id === item.id ? 'contained' : 'outlined'}
                                        onClick={() =>
                                            setVariant({
                                                id: item.id,
                                                price: item.price,
                                                discount: item.discount,
                                                quantity: item.availableQuantity,
                                            })
                                        }
                                    >
                                        {item.variationName}
                                    </Button>
                                </Grid2>
                            ))}
                        </Grid2>
                    </div>
                )}
                <div>
                    {/* quantity */}
                    <Typography variant="h6" display="inline-block" paddingRight={2}>
                        {labels.quantity}
                    </Typography>
                    <Typography variant="body2" display="inline-block">
                        {labels.inStock}: {variant?.quantity}
                    </Typography>
                    {/* quantity button */}
                    <Box>
                        <IconButton onClick={() => updateQuantity('minus')}>
                            <Remove />
                        </IconButton>
                        <TextField
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            variant="outlined"
                            type="number"
                            size="small"
                            inputProps={{
                                readOnly: true,
                                sx: {
                                    textAlign: 'center',
                                    width: '4   rem',
                                    px: '0.2rem',
                                },
                            }}
                        />
                        <IconButton onClick={() => updateQuantity('plus')}>
                            <Add />
                        </IconButton>
                    </Box>
                </div>

                <ButtonControll />
                {/*  Description*/}
                <ProductDescription description={product.description} />
            </Stack>
        </Grid2>
    );
};

export default ProductInfo;
