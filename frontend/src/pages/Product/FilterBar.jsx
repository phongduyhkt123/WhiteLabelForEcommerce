import { Button, Checkbox, Divider, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { route } from '~/config';
import React, { useRef } from 'react';
import * as request from '~/utils/httpRequest';

const FilterBar = ({ filter, setFilter, initFilter }) => {
    const filterRef = useRef(null);

    const { data: categories } = request.useAxios({ url: route.categoryAPI });

    const header = document.getElementById('header');

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

    const clearFilter = () => setFilter(initFilter);

    return (
        <Paper sx={{ position: 'sticky', top: header?.clientHeight + 5 }}>
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
    );
};

export default FilterBar;
