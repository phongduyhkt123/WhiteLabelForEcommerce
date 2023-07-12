import { Chip } from '@mui/material';
import { useContext } from 'react';
import { ConfigContext } from '~/context/ConfigContext';
const OrderStatus = ({ code, ...rest }) => {
    const { orderStatus } = useContext(ConfigContext);
    const status = orderStatus.items[code];

    return (
        <>
            {status && (
                <Chip
                    label={orderStatus.labels[status.name]}
                    {...rest}
                    variant="outlined"
                    sx={{ color: status.color, bgcolor: '#fff' }}
                />
            )}
        </>
    );
};

export default OrderStatus;
