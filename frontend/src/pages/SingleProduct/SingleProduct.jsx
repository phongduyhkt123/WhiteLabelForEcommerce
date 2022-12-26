import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom';
import Title from '~/components/Title/Title';
import { route } from '~/config';
import { ProductProvider } from '~/context/ProductContext';

import * as request from '~/utils/httpRequest';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

function SingleProduct() {
    const { id } = useParams();

    const { data: product, loaded } = request.useAxios({ url: `${route.productAPI}/${id}` });

    return (
        <Box>
            {loaded && (
                <Title title={product.name}>
                    <Grid2 container spacing={2} my={1} mx="auto">
                        {/* images */}
                        <ProductImages images={[...Object.values(product.allImgVar), ...product.allImgUrl]} />
                        {/* info */}
                        <ProductProvider>
                            <ProductInfo product={product} />
                        </ProductProvider>
                    </Grid2>
                </Title>
            )}
        </Box>
    );
}

export default SingleProduct;
