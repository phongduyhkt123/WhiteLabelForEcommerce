import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';

import { Button, Checkbox, Divider, Pagination, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { header, route } from '~/config';
import * as request from '~/utils/httpRequest';
import useGetProduct from '~/hooks/useGetProduct';
import ProductCardSkeleton from '~/components/Skeleton/ProductCardSkeleton';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import { useSearchParams } from 'react-router-dom';

const Product = () => {
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

    const { data: categories } = request.useAxios(route.categoryAPI, 'GET');

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item);
                    setFilter({ ...filter, category: newCategory });
                    break;
                default:
            }
        }
    };

    const [page, setPage] = useState(1);
    const handleChangePage = ({}, page) => {
        setPage(page);
    };

    const { loaded, data: products, error } = useGetProduct(filter, page);

    if (error) {
        setMessage({ text: error.message, severity: 'error', type: AlertTypes.SNACKBAR_SMALL });
        setShowMessage(true);
    }

    const clearFilter = () => setFilter(initFilter);

    const filterRef = useRef(null);

    return (
        <Grid2 container spacing={3}>
            {/* Sidebar */}
            <Grid2 item xs={12} md={2}>
                <Paper sx={{ position: 'sticky', top: header.styles.height ? header.styles.height + 5 : 90 }}>
                    <div className="catalog__filter" ref={filterRef}>
                        <div className="catalog__filter__close" onClick={() => {}}>
                            <i className="bx bx-left-arrow-alt"></i>
                        </div>

                        <Stack
                            direction={'column'}
                            spacing={1}
                            divider={<Divider variant="middle" sx={{ borderColor: 'white' }} />}
                        >
                            <div className="catalog__filter__widget">
                                <Typography>Loại sản phẩm</Typography>
                                <div className="catalog__filter__widget__content">
                                    {categories?.map((item) => (
                                        <Box key={item.id} display="flex" alignItems="center">
                                            <Checkbox
                                                label={item.name}
                                                sx={{ color: 'primary.main' }}
                                                onChange={(e) => filterSelect('CATEGORY', e.target.checked, item.id)}
                                                checked={filter.category.includes(item.id)}
                                            />
                                            <Typography>{item.name}</Typography>
                                        </Box>
                                    ))}
                                </div>
                            </div>
                        </Stack>

                        <div className="catalog__filter__widget">
                            <div className="catalog__filter__widget__content">
                                <Button size="sm" onClick={clearFilter}>
                                    xóa bộ lọc
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="catalog__filter__toggle">
                        <Button size="sm" onClick={() => {}}>
                            bộ lọc
                        </Button>
                    </div>
                </Paper>
            </Grid2>
            <Divider variant="middle" sx={{ borderWidth: '0.8px' }} />
            {/* Product list */}
            <Grid2 item flex={1}>
                <Grid2 container spacing={3}>
                    {loaded
                        ? products.map((item, index) => (
                              <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                                  <ProductCard data={item} />
                              </Grid2>
                          ))
                        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => <ProductCardSkeleton key={item} />)}
                </Grid2>
                <Pagination color="primary" count={10} size="large" sx={{ mt: 2 }} onChange={handleChangePage} />
            </Grid2>
        </Grid2>
    );
};

export default Product;
