import React, { useCallback, useState, useEffect, useRef } from 'react';

import { Button, Checkbox, Divider, Paper, Stack, Typography } from '@mui/material';
import { ProductCard } from '~/layouts/components/ProductCard/ProductCard';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { header, route } from '~/config';
import * as request from '~/utils/httpRequest';

const Product = () => {
    const initFilter = {
        category: [],
        color: [],
        size: [],
    };

    const category = ['cat1', 'cat2', 'cat3'];
    const colors = ['color1', 'color2', 'color3'];
    const size = ['size1', 'size2', 'size3'];

    const [filter, setFilter] = useState(initFilter);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.color] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'COLOR':
                    const newColor = filter.color.filter((e) => e !== item.color);
                    setFilter({ ...filter, color: newColor });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
            }
        }
    };

    const clearFilter = () => setFilter(initFilter);

    // my code
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const res = await request.get(route.productAPI);
        setProducts(res.data.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

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

    const showHideFilter = () => filterRef.current.classList.toggle('active');

    return (
        <Grid2 container spacing={3}>
            {/* Sidebar */}
            <Grid2 item xs={12} md={2}>
                <Paper sx={{ position: 'sticky', top: header.styles.height ? header.styles.height + 5 : 90 }}>
                    <div className="catalog__filter" ref={filterRef}>
                        <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                            <i className="bx bx-left-arrow-alt"></i>
                        </div>

                        <Stack
                            direction={'column'}
                            spacing={1}
                            divider={<Divider variant="middle" sx={{ borderColor: 'white' }} />}
                        >
                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">danh mục sản phẩm</div>
                                <div className="catalog__filter__widget__content">
                                    {category.map((item, index) => (
                                        <Box key={index} display="flex" alignItems="center">
                                            <Checkbox
                                                label={item.display}
                                                sx={{ color: 'primary.main' }}
                                                onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                                                checked={filter.category.includes(item.categorySlug)}
                                            />
                                            <Typography> something</Typography>
                                        </Box>
                                    ))}
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">màu sắc</div>
                                <div className="catalog__filter__widget__content">
                                    {colors.map((item, index) => (
                                        <Box key={index} display="flex" alignItems="center">
                                            <Checkbox
                                                label={item.display}
                                                sx={{ color: 'primary.main' }}
                                                onChange={(input) => filterSelect('COLOR', input.checked, item)}
                                                checked={filter.color.includes(item.color)}
                                            />
                                            <Typography> something</Typography>
                                        </Box>
                                    ))}
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">kích cỡ</div>
                                <div className="catalog__filter__widget__content">
                                    {size.map((item, index) => (
                                        <Box key={index} display="flex" alignItems="center">
                                            <Checkbox
                                                label={item.display}
                                                sx={{ color: 'primary.main' }}
                                                onChange={(input) => filterSelect('SIZE', input.checked, item)}
                                                checked={filter.size.includes(item.size)}
                                            />
                                            <Typography> something</Typography>
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
                        <Button size="sm" onClick={() => showHideFilter()}>
                            bộ lọc
                        </Button>
                    </div>
                </Paper>
            </Grid2>
            <Divider variant="middle" sx={{ borderWidth: '0.8px' }} />
            {/* Product list */}
            <Grid2 item container spacing={3} flex={1}>
                {products.map((item, index) => (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ProductCard data={item} />
                    </Grid2>
                ))}
            </Grid2>
        </Grid2>
    );
};

export default Product;
