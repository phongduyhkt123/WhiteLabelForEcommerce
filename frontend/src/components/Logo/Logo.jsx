import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConfigContext } from '~/context/ConfigContext';

const Logo = () => {
    const config = useContext(ConfigContext);
    return (
        <Box component={Link} to={config?.routes.home.path} width="100px">
            <Box component="img" src={config?.global.logo.src} alt="logo" sx={{ width: '100%', objectFit: 'fill' }} />
        </Box>
    );
};

export default Logo;
