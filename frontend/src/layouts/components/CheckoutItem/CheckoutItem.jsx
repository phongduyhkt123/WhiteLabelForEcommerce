import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';

import { route } from '~/config';

/// Set time out when update quantity
const CheckoutItem = ({ item }) => {
    return (
        <Box height={130}>
            <Grid2 container width="100%" height="100%" direction="row">
                {/* image */}
                <Grid2 item xs={2} height="100%" display="flex">
                    <Box
                        component="img"
                        src={item.productDetail.avatar}
                        alt=""
                        height="100%"
                        width="100%"
                        margin="auto"
                        sx={{ objectFit: 'cover' }}
                    />
                </Grid2>
                {/* info */}
                <Grid2 item xs={10} container display="flex" justifyContent="space-around" alignItems="center">
                    <Grid2 item xs={5}>
                        <Typography component={Link} variant="h5" to={`${route.product.path}/${item.productDetail.id}`}>
                            {item.productDetail.name}
                        </Typography>
                    </Grid2>
                    <Grid2 item xs={3}>
                        <Typography textAlign="center">{item.productVariation.price} VND</Typography>
                    </Grid2>
                    <Grid2 item xs={2}>
                        {/* quantity */}
                        <Typography px={2}>{item.quantity}</Typography>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};

CheckoutItem.propTypes = {
    item: PropTypes.object,
};

export default CheckoutItem;
