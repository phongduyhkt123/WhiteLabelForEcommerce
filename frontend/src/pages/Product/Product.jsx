import { useContext, useEffect, useState } from 'react';

import { Pagination, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useSearchParams } from 'react-router-dom';
import { ProductCardSkeleton } from '~/components/Skeleton';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import useGetProduct from '~/hooks/useGetProduct';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import FilterBar from './FilterBar';
import times from 'lodash.times';
import useTraceUpdate from '~/hooks/useTrackUpdate';
import { useTitle } from '~/hooks';
import { ConfigContext } from '~/context/ConfigContext';

const Product = ({ title }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setShowMessage, setMessage } = useContext(AlertContext);

    const { product } = useContext(ConfigContext);

    const [setTitle] = useTitle(title);

    const category = searchParams.get('idCategory') ? [parseInt(searchParams.get('idCategory'))] : '';
    const initFilter = {
        category: category || [],
    };

    searchParams.get('key') && (initFilter.key = searchParams.get('key'));

    const [filter, setFilter] = useState(initFilter);

    const [page, setPage] = useState(1);
    const handleChangePage = ({}, page) => {
        setPage(page);
    };

    // reload when click again product tab
    useEffect(() => {
        if (Object.entries(searchParams).length === 0) {
            setFilter(initFilter);
        } else if (searchParams.get('key')) {
            setFilter({ ...filter, key: searchParams.get('key') });
        } else if (searchParams.get('idCategory')) {
            setFilter({ ...filter, category: [parseInt(searchParams.get('idCategory'))] });
        }

        if (searchParams.get('key')) {
            setTitle(searchParams.get('key'));
        } else {
            setTitle(title);
        }
    }, [searchParams]);

    useEffect(() => {
        setSearchParams({ key: searchParams.get('key') || '', idCategory: filter.category, page: page });
    }, [filter, page]);

    const { loaded, data: products, error } = useGetProduct(filter, page);

    console.log(products);

    useEffect(() => {
        if (error) {
            setMessage({ text: error.message, severity: 'error', type: AlertTypes.SNACKBAR_SMALL });
            setShowMessage(true);
        }
    }, [error]);

    useTraceUpdate({ filter, page, searchParams });

    return (
        <Grid2 container spacing={2}>
            {/* Sidebar */}
            <Grid2 item xs={12} sm={3} md={2}>
                <FilterBar filter={filter} setFilter={setFilter} initFilter={initFilter} />
            </Grid2>
            {/* Product list */}
            <Grid2 item xs={12} sm={8} md={10}>
                {searchParams.get('key') && (
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        {product.labels.searchResult} "{searchParams.get('key')}"
                    </Typography>
                )}
                <Grid2 container spacing={2}>
                    {loaded
                        ? products.data.map((item, index) => (
                              <Grid2 item xs={6} sm={6} md={4} lg={2.4} key={index}>
                                  <ProductCard data={item} />
                              </Grid2>
                          ))
                        : times(10).map((item) => <ProductCardSkeleton key={item} />)}
                </Grid2>
                <Pagination
                    color="primary"
                    count={products?.totalPage}
                    size="large"
                    sx={{ mt: 2 }}
                    onChange={handleChangePage}
                />
            </Grid2>
        </Grid2>
    );
};

export default Product;
