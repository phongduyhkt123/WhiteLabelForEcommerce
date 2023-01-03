import { Pagination, Stack } from '@mui/material';
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

    const { data: orders, loaded } = request.useAxios({
        url: route.orderAPI,
        config: { params: { page } },
        dep: [page],
        isAuthen: true,
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChangePage = ({}, page) => {
        setPage(page);
        setSearchParams({ page });
    };

    return (
        <Title title={title}>
            <Stack spacing={1}>
                {loaded
                    ? orders.data.map((item) => <OrderItem key={item.id} item={item} />)
                    : times(10).map((n) => <CartItemSkeleton key={n} />)}
            </Stack>
            ;
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
