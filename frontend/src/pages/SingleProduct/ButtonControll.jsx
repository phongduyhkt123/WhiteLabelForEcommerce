import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import { ConfigContext } from '~/context/ConfigContext';
import { GlobalContext } from '~/context/GlobalContext';
import { ProductContext } from '~/context/ProductContext';
import * as request from '~/utils/httpRequest';

const ButtonControll = () => {
    const { singleProduct, routes: route } = useContext(ConfigContext);
    const labels = singleProduct.labels;

    const { quantity, variant } = useContext(ProductContext);

    const { setMessage, setShowMessage } = useContext(AlertContext);
    const { setTotalCartItem } = useContext(GlobalContext);

    const addToCart = async () => {
        if (variant === undefined) {
            setMessage({ text: labels.variantRequired, severity: 'warning', type: AlertTypes.SNACKBAR_LARGE });
        } else {
            try {
                const response = await request.post(`${route.cartAPI.url}/${variant.id}`, {
                    quantity,
                });
                if (response.status === 200) {
                    setMessage({ text: labels.addToCartSuccess, severity: 'success' });
                    setTotalCartItem((prev) => prev + quantity);
                }
            } catch (e) {
                setMessage({ text: e.response?.data?.message || labels.addToCartUnKnownError, severity: 'error' });
            }
        }
        setShowMessage(true);
    };

    const handleBuyNow = (e) => {
        if (!variant) {
            e.preventDefault();
            setMessage({ text: labels.variantRequired, severity: 'warning', type: AlertTypes.SNACKBAR_LARGE });
            setShowMessage(true);
        }
    };
    return (
        <Stack direction="row" spacing={2}>
            <LoadingButton
                variant="outlined"
                sx={{ flex: 1, fontSize: '1.8rem' }}
                fullWidth
                onClick={() => addToCart()}
            >
                {labels.addToCart}
            </LoadingButton>
            <Button
                variant="contained"
                sx={{ flex: 1, fontSize: '2rem' }}
                fullWidth
                LinkComponent={Link}
                to={`${route.checkout.path}?id=${variant?.id}&quantity=${quantity}`}
                onClick={(e) => handleBuyNow(e)}
            >
                {labels.buyNow}
            </Button>
        </Stack>
    );
};

export default ButtonControll;
