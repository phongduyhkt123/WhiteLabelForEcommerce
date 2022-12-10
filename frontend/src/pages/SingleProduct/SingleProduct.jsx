import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { route } from '~/config';
import { ProductProvider } from '~/context/ProductContext';

import config from '~/data/config.json';
import * as request from '~/utils/httpRequest';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {},
    },
    divider: {
        borderWidth: '1px !important',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

const labels = config.labels.singleProduct;

function SingleProduct() {
    const classes = useStyles();

    const { id } = useParams();

    const { data: product, loaded } = request.useAxios({ url: `${route.productAPI}/${id}` });

    return (
        <Box>
            {loaded && (
                <Grid2 container spacing={2} my={1} mx="auto">
                    {/* images */}
                    <ProductImages images={product.images} />
                    {/* info */}
                    <ProductProvider>
                        <ProductInfo product={product} />
                    </ProductProvider>
                </Grid2>
            )}
        </Box>
    );
}

export default SingleProduct;
