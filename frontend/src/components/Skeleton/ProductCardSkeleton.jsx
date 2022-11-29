import { Skeleton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
            <Skeleton variant="rectangular" width="100%" height={118} />
            <Skeleton />
            <Skeleton width="60%" />
        </Grid2>
    );
};

export default ProductCardSkeleton;
