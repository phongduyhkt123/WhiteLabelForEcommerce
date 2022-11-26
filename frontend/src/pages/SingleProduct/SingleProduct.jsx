import { Add, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
    Button,
    Divider,
    Paper,
    Box,
    Rating,
    Stack,
    TextField,
    Typography,
    Snackbar,
    Alert,
    IconButton,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { route } from '~/config';
import { AlertContext } from '~/context/AlertContext';
import { GlobalContext } from '~/context/GlobalContext';
import * as request from '~/utils/httpRequest';
import { commas } from '~/utils/formater';

function SingleProduct() {
    const { id } = useParams();
    const { message, showMessage, setMessage, setShowMessage } = useContext(AlertContext);
    const { setTotalCartItem } = useContext(GlobalContext);

    const [product, setProduct] = useState();
    const [variant, setVariant] = useState(0);

    const getProduct = async () => {
        const response = await request.get(`${route.productAPI}/${id}`);
        setProduct(response.data.data);
    };

    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        setPreviewImg({ id: product?.images[0].id, url: product?.images[0].url });
    }, [product]);

    const [previewImg, setPreviewImg] = useState();

    const [descriptionExpand, setDescriptionExpand] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (type) => {
        type === 'plus' ? setQuantity(quantity + 1) : setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    };

    const addToCart = async () => {
        if (product.variations.length > 1 && variant === 0) {
            setMessage({
                text: 'Please select a variant',
                severity: 'warning',
            });
            setShowMessage(true);
            return;
        } else if (product.variations.length < 1) {
            setVariant(product.variations[0].id);
        }

        try {
            const response = await request.post(`${route.cartAPI}/${variant}`, {
                quantity,
            });
            if (response.status === 200) {
                setMessage({ text: 'Thêm vào giỏ hàng thành công!', severity: 'success' });
                setTotalCartItem((prev) => prev + quantity);
            }
        } catch (e) {
            setMessage({ text: e.response?.data?.message || 'Something went wrong', severity: 'error' });
        }
        setShowMessage(true);
    };

    const limitDescription = !descriptionExpand
        ? {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '5',
              WebkitBoxOrient: 'vertical',
          }
        : {};

    return (
        <Box>
            <Grid2 container columnSpacing={5} my={5} mx="auto">
                {/* images */}
                <Grid2 item xs={7}>
                    <Paper sx={{ position: 'relative', left: -70, py: 4, borderRadius: 0 }}>
                        <Grid2 containter columnSpacing={3} display="flex">
                            {/* image list */}
                            <Grid2 item xs={2}>
                                <Stack
                                    spacing={3}
                                    alignItems="center"
                                    maxHeight={500}
                                    overflow="auto"
                                    sx={{ direction: 'rtl' }}
                                >
                                    {product?.images.map((image) => (
                                        <Box
                                            key={image.id}
                                            component="img"
                                            onClick={() => setPreviewImg({ id: image.id, url: image.url })}
                                            src={image.url}
                                            alt=""
                                            height={80}
                                            width="100%"
                                            border={previewImg?.id === image.id ? '5px solid' : 'none'}
                                            sx={{
                                                objectFit: 'cover',
                                                opacity: image.id === previewImg.id ? 1 : 0.5,
                                                cursor: 'pointer',
                                                borderColor: 'primary.main',
                                                direction: 'ltr',
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Grid2>
                            {/* image preview */}
                            <Grid2 item xs={9}>
                                <Box
                                    component="img"
                                    src={previewImg?.url}
                                    alt=""
                                    width="100%"
                                    maxHeight={700}
                                    sx={{ objectFit: 'cover' }}
                                />
                            </Grid2>
                        </Grid2>
                    </Paper>
                </Grid2>
                <Divider variant="middle" sx={{ background: 'pink', borderWidth: '0.8px' }} />
                {/* info */}
                <Grid2 flex={1}>
                    <Typography variant="h2">{product?.name}</Typography>
                    <Rating name="simple-controlled" size="large" value={5} onChange={(event, newValue) => {}} />
                    <Box>
                        <div className="product__info__item">
                            <Typography variant="h3">{commas(product?.minPrice || 0)} đ</Typography>
                        </div>
                        {product?.variations?.length > 1 && (
                            <div>
                                <Typography>Phân loại</Typography>
                                <Grid2 container spacing={2}>
                                    {product?.variations?.map((item) => (
                                        <Grid2 key={item.id}>
                                            <Button
                                                variant={variant === item.id ? 'contained' : 'outlined'}
                                                onClick={() => setVariant(item.id)}
                                            >
                                                {item.variationName}
                                            </Button>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </div>
                        )}

                        <div className="product__info__item">
                            <div className="product__info__item__title">Số lượng</div>
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
                                    InputProps={{
                                        readOnly: true,
                                        sx: {
                                            textAlignLast: 'right',
                                            width: 80,
                                        },
                                    }}
                                />
                                <IconButton onClick={() => updateQuantity('plus')}>
                                    <Add />
                                </IconButton>
                            </Box>
                        </div>
                        <Stack direction="row" spacing={2}>
                            <LoadingButton
                                variant="outlined"
                                sx={{ flex: 1, fontSize: '1.8rem' }}
                                fullWidth
                                onClick={() => addToCart()}
                            >
                                thêm vào giỏ
                            </LoadingButton>
                            <Button variant="contained" sx={{ flex: 1, fontSize: '2rem' }} fullWidth>
                                mua ngay
                            </Button>
                        </Stack>
                    </Box>
                    {/*  Description*/}
                    <Box>
                        <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                            <Typography variant="h5">Chi tiết sản phẩm</Typography>
                            <Typography
                                variant="body1"
                                dangerouslySetInnerHTML={{ __html: product?.description }}
                                /* new line with \n */
                                whiteSpace="pre-line"
                                sx={{
                                    overflowWrap: 'break-word', // word break for long text
                                    ...limitDescription,
                                }}
                            />
                            <div className="product-description__toggle">
                                <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                                    {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default SingleProduct;
