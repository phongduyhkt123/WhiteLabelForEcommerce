import { Stack } from '@mui/material';
import { route } from '~/config';
import * as request from '~/utils/httpRequest';
import OrderItem from './OrderItem';

const Order = () => {
    const { data: orders, loaded } = request.useAxios({ url: route.orderAPI, isAuthen: true });

    return <Stack spacing={1}>{loaded && orders.map((item) => <OrderItem key={item.id} item={item} />)}</Stack>;
};

export default Order;
