import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Icon from '~/config/Store/Icon';
const { Typography, Radio, ButtonBase } = require('@mui/material');

const PaymentMethodItem = ({ id, code, name, icon, selectedID, onClick }) => {
    return (
        <Grid2 container alignItems="center" onClick={() => onClick(id)} component={ButtonBase} textAlign="left">
            <Grid2 item xs={1}>
                <Radio
                    checked={selectedID === id}
                    value={id}
                    sx={{ color: 'primary.main' }}
                    inputProps={{ 'aria-label': 'A' }}
                />
            </Grid2>
            <Grid2 item xs={1} display="flex" alignItems="center" justifyContent="center">
                <Icon component={icon} />
            </Grid2>
            <Grid2 item xs={10}>
                <Typography variant="body1">{name}</Typography>
            </Grid2>
        </Grid2>
    );
};

export default PaymentMethodItem;
