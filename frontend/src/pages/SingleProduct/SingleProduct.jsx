import { Add, Remove } from '@mui/icons-material';
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

function SingleProduct() {
    const { id } = useParams();
    const { message, showMessage, setMessage, setShowMessage } = useContext(AlertContext);
    const { setTotalCartItem } = useContext(GlobalContext);

    const [product, setProduct] = useState();

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

    const [color, setColor] = useState(undefined);

    const [size, setSize] = useState(undefined);

    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    // useEffect(() => {
    //     setPreviewImg(product.image01);
    //     setColor(undefined);
    //     setSize(undefined);
    // }, [product]);

    const check = () => {
        if (color === undefined) {
            alert('Vui lòng chọn màu sắc!');
            return false;
        }

        if (size === undefined) {
            alert('Vui lòng chọn kích cỡ!');
            return false;
        }

        return true;
    };

    const addToCart = async () => {
        try {
            const response = await request.post(`${route.cartAPI}/${product.variations[0].id}`, {
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

    const goToCart = () => {
        if (check()) {
            let newItem = {
                slug: product.slug,
                color: color,
                size: size,
                price: product.price,
                quantity: quantity,
            };
            // if (dispatch(addItem(newItem))) {
            //     dispatch(remove());
            //     props.history.push('/cart');
            // } else {
            //     alert('Fail');
            // }
        }
    };

    return (
        <Box>
            <Grid2 container columnSpacing={5} my={5} mx="auto">
                {/* images */}
                <Grid2 item xs={7}>
                    <Paper sx={{ position: 'relative', left: -70, py: 4, borderRadius: 0 }}>
                        <Grid2 containter columnSpacing={3} display="flex">
                            {/* image list */}
                            <Grid2 item xs={3}>
                                <Stack spacing={3} alignItems="center">
                                    {product?.images.map((image) => (
                                        <Box
                                            key={image.id}
                                            component="img"
                                            onClick={() => setPreviewImg({ id: image.id, url: image.url })}
                                            src={image.url}
                                            alt=""
                                            height={200}
                                            width="100%"
                                            sx={{ objectFit: 'cover' }}
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
                    <Typography variant="h1">{product?.name}</Typography>
                    <Rating name="simple-controlled" size="large" value={5} onChange={(event, newValue) => {}} />
                    <Box>
                        <div className="product__info__item">
                            <Typography variant="h3">1.000.000đ</Typography>
                        </div>
                        <div className="product__info__item">
                            <div className="product__info__item__title">Màu sắc</div>
                            <div className="product__info__item__list">
                                {product?.colors?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`product__info__item__list__item ${color === item ? 'active' : ''}`}
                                        onClick={() => setColor(item)}
                                    >
                                        <div className={`circle bg-${item}`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="product__info__item">
                            <div className="product__info__item__title">Kích cỡ</div>
                            <div className="product__info__item__list">
                                {product?.size?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`product__info__item__list__item ${size === item ? 'active' : ''}`}
                                        onClick={() => setSize(item)}
                                    >
                                        <span className="product__info__item__list__item__size">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
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
                            <Button
                                variant="outlined"
                                sx={{ flex: 1, fontSize: '1.8rem' }}
                                fullWidth
                                onClick={() => addToCart()}
                            >
                                thêm vào giỏ
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ flex: 1, fontSize: '2rem' }}
                                fullWidth
                                onClick={() => goToCart()}
                            >
                                mua ngay
                            </Button>
                        </Stack>
                    </Box>
                    {/*  Description*/}
                    <Box>
                        <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                            <Typography variant="h5">Chi tiết sản phẩm</Typography>
                            <div
                                className="product-description__content"
                                dangerouslySetInnerHTML={{ __html: product?.description }}
                            ></div>
                            <div className="product-description__toggle">
                                <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                                    {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Grid2>
            </Grid2>
            <Snackbar
                open={showMessage}
                autoHideDuration={1000}
                onClose={() => setShowMessage(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={message.severity} sx={{ width: '100%' }}>
                    {message.text}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default SingleProduct;
