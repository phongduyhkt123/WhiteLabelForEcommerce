import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';

import { cart, route } from '~/config';
import { commas } from '~/utils/formater';

const CheckOutItem = ({ idProduct, productVariationName, productName, avatar, price, quantity }) => {
    return (
        <Box>
            <Grid2 container width="100%" height="100%" direction="row" columnSpacing={2} alignItems="center">
                {/* image */}
                <Grid2 item xs={3} md={2} height="100%" display="flex" bgcolor="background.default">
                    <Box
                        component="img"
                        src={avatar}
                        alt=""
                        width="100%"
                        maxWidth="10rem"
                        margin="auto"
                        sx={{ objectFit: 'contain', aspectRatio: '1/1' }}
                    />
                </Grid2>
                {/* info */}
                <Grid2 item xs={9} md={10} container display="flex" justifyContent="space-around" alignItems="center">
                    <Grid2 item xs={12} md={5}>
                        <Typography component={Link} variant="body1" to={`${route.product.path}/${idProduct}`}>
                            {productName}
                        </Typography>
                        <Typography variant="body1">
                            {cart.labels.variant}: {productVariationName}
                        </Typography>
                    </Grid2>
                    <Grid2
                        item
                        xs={6}
                        md={3}
                        alignSelf="stretch"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography textAlign="center">{commas(price)}</Typography>
                    </Grid2>
                    <Grid2 item xs={6} md={2} justifyContent="center" alignItems="center" display="flex">
                        {cart.labels.quantity}:{/* quantity */}
                        <Typography px={2}>{quantity}</Typography>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default CheckOutItem;
