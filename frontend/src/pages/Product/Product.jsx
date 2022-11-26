import React, { useCallback, useState, useEffect, useRef } from 'react';

import { Button, Checkbox, Divider, Pagination, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { header, route } from '~/config';
import * as request from '~/utils/httpRequest';

const Product = () => {
    const initFilter = {
        category: [],
    };

    const [filter, setFilter] = useState(initFilter);

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const res = await request.get(route.categoryAPI);
        if (res.status === 200) {
            setCategories(res.data.data);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

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

    useEffect(() => {
        let params = {};
        params.page = page;
        if (filter.category.length > 0)
            params = {
                ...params,
                idCategory: filter.category[0],
            };
        getProducts(params);
    }, [filter, page]);

    const clearFilter = () => setFilter(initFilter);

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const getProducts = async (params) => {
        setIsLoading(true);
        const res = await request.get(route.productAPI, { params });
        setProducts(res.data.data);
        setIsLoading(false);
    };

    //
    // const updateProducts = useCallback(() => {
    //     let temp = productList;

    //     if (filter.category.length > 0) {
    //         temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    //     }

    //     if (filter.color.length > 0) {
    //         temp = temp.filter((e) => {
    //             const check = e.colors.find((color) => filter.color.includes(color));
    //             return check !== undefined;
    //         });
    //     }

    //     if (filter.size.length > 0) {
    //         temp = temp.filter((e) => {
    //             const check = e.size.find((size) => filter.size.includes(size));
    //             return check !== undefined;
    //         });
    //     }

    //     setProducts(temp);
    // }, [filter, productList]);

    // useEffect(() => {
    //     updateProducts();
    // }, [updateProducts]);

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
                                <Typography>danh mục sản phẩm</Typography>
                                <div className="catalog__filter__widget__content">
                                    {categories.map((item) => (
                                        <Box key={item.id} display="flex" alignItems="center">
                                            <Checkbox
                                                label={item.name}
                                                sx={{ color: 'primary.main' }}
                                                onChange={(e) => filterSelect('CATEGORY', e.target.checked, item.id)}
                                                checked={filter.category.includes(item.id)}
                                            />
                                            <Typography> {item.name}</Typography>
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
                    {!isLoading
                        ? products.map((item, index) => (
                              <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                                  <ProductCard data={item} />
                              </Grid2>
                          ))
                        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                              <Grid2 item xs={12} sm={6} md={4} lg={3} key={item}>
                                  <Skeleton variant="rectangular" width="100%" height={118} />
                                  <Skeleton />
                                  <Skeleton width="60%" />
                              </Grid2>
                          ))}
                </Grid2>
                <Pagination color="primary" count={10} size="large" sx={{ mt: 2 }} onChange={handleChangePage} />
            </Grid2>
        </Grid2>
    );
};

export default Product;
