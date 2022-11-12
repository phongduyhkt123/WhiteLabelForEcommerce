import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavItem = ({ to, icon, title, ...others }) => {
    return (
        <Button
            component={Link}
            to={to}
            startIcon={icon}
            disableRipple
            variant="outlined"
            sx={{
                borderRadius: 1,
                px: 3,
                fontSize: '1.8rem',
                textAlign: 'left',
                width: '100%',
            }}
        >
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
    );
};

NavItem.propTypes = {
    to: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.string,
};
