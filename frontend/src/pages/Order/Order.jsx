import { Box, Button, ButtonGroup, Pagination, Stack } from '@mui/material';
import Title from '~/components/Title/Title';
import * as request from '~/utils/httpRequest';
import OrderItem from './OrderItem';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConfigContext } from '~/context/ConfigContext';
import times from 'lodash.times';
import { CartItemSkeleton } from '~/components/Skeleton';

const Order = ({ title }) => {
    const { routes: route } = useContext(ConfigContext);

    const [page, setPage] = useState(1);

    const [active, setActive] = useState(1);

    const { data: orders, loaded } = request.useAxios({
        url: route.orderAPI.url,
        config: { params: { page } },
        dep: [page],
        isAuthen: true,
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const filter = ({ target: { value } }) => {
        setActive(value);
        setSearchParams({ status: value });
    };

    const handleChangePage = ({}, page) => {
        setPage(page);
        setSearchParams({ page });
    };

    console.log(active == 1);

    return (
        <Title title={title}>
            <ButtonGroup variant="outlined" fullWidth>
                <Button value={1} onClick={filter} variant={active == 1 ? 'contained' : 'outlined'}>
                    Waiting for payment
                </Button>
                <Button value={2} onClick={filter} variant={active == 2 ? 'contained' : 'outlined'}>
                    Waiting for confirm
                </Button>
                <Button value={3} onClick={filter} variant={active == 3 ? 'contained' : 'outlined'}>
                    Delivering
                </Button>
                <Button value={4} onClick={filter} variant={active == 4 ? 'contained' : 'outlined'}>
                    Delivered
                </Button>
                <Button value={5} onClick={filter} variant={active == 5 ? 'contained' : 'outlined'}>
                    Completed
                </Button>
                <Button value={6} onClick={filter} variant={active == 6 ? 'contained' : 'outlined'}>
                    Canceled
                </Button>
            </ButtonGroup>
            <Stack spacing={1}>
                {loaded
                    ? orders.data.map((item) => <OrderItem key={item.id} item={item} />)
                    : times(10).map((n) => <CartItemSkeleton key={n} />)}
            </Stack>

            <Pagination
                color="primary"
                count={orders?.totalPage}
                size="large"
                sx={{ mt: 2 }}
                onChange={handleChangePage}
            />
        </Title>
    );
};

export default Order;
