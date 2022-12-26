import { Pagination, Stack } from '@mui/material';
import Title from '~/components/Title/Title';
import { route } from '~/config';
import * as request from '~/utils/httpRequest';
import OrderItem from './OrderItem';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Order = ({ title }) => {
    const [page, setPage] = useState(1);

    const { data: orders, loaded } = request.useAxios({ url: route.orderAPI, dep: [page], isAuthen: true });

    const [searchParams, setSearchParams] = useSearchParams();

    setSearchParams({ page });

    const handleChangePage = ({}, page) => {
        setPage(page);
    };

    return (
        <Title title={title}>
            <Stack spacing={1}>{loaded && orders?.data.map((item) => <OrderItem key={item.id} item={item} />)}</Stack>;
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
