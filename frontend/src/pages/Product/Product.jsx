import { useContext, useEffect, useState } from 'react';

import { Pagination } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useSearchParams } from 'react-router-dom';
import { ProductCardSkeleton } from '~/components/Skeleton';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import useGetProduct from '~/hooks/useGetProduct';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import FilterBar from './FilterBar';
import Title from '~/components/Title/Title';

const Product = ({ title }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setShowMessage, setMessage } = useContext(AlertContext);
    const initFilter = {
        category: [],
    };

    const [filter, setFilter] = useState(initFilter);

    useEffect(() => {
        const category = searchParams.get('idCategory');
        category && setFilter({ ...initFilter, category: [parseInt(category)] });
    }, [searchParams]);

    const [page, setPage] = useState(1);
    const handleChangePage = ({}, page) => {
        setPage(page);
    };

    const { loaded, data: products, error } = useGetProduct(filter, page);

    if (error) {
        setMessage({ text: error.message, severity: 'error', type: AlertTypes.SNACKBAR_SMALL });
        setShowMessage(true);
    }

    return (
        <Title title={title}>
            <Grid2 container spacing={2}>
                {/* Sidebar */}
                <Grid2 item xs={12} sm={3} md={2}>
                    <FilterBar filter={filter} setFilter={setFilter} initFilter={initFilter} />
                </Grid2>
                {/* Product list */}
                <Grid2 item xs={12} sm={8} md={10}>
                    <Grid2 container spacing={2}>
                        {loaded
                            ? products.map((item, index) => (
                                  <Grid2 item xs={6} sm={6} md={4} lg={2.4} key={index}>
                                      <ProductCard data={item} />
                                  </Grid2>
                              ))
                            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => <ProductCardSkeleton key={item} />)}
                    </Grid2>
                    <Pagination color="primary" count={10} size="large" sx={{ mt: 2 }} onChange={handleChangePage} />
                </Grid2>
            </Grid2>
        </Title>
    );
};

export default Product;
