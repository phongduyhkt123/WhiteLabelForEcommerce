import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/images';
import { route } from '~/config';

const Logo = () => {
    return (
        <Box component={Link} to={route.home} width="100px">
            <Box component="img" src={`${logo.src}`} alt="logo" sx={{ width: '100%', objectFit: 'fill' }} />
        </Box>
    );
};

export default Logo;
