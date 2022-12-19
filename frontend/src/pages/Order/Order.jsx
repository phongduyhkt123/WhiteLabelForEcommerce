import { Stack } from '@mui/material';
import Title from '~/components/Title/Title';
import { route } from '~/config';
import * as request from '~/utils/httpRequest';
import OrderItem from './OrderItem';

const Order = ({ title }) => {
    const { data: orders, loaded } = request.useAxios({ url: route.orderAPI, isAuthen: true });

    return (
        <Title title={title}>
            <Stack spacing={1}>{loaded && orders.map((item) => <OrderItem key={item.id} item={item} />)}</Stack>;
        </Title>
    );
};

export default Order;
