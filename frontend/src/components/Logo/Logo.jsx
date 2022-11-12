import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo.svg';
import { route } from '~/config';

const Logo = () => {
    return (
        <Link to={route.home}>
            <Box component="img" src={logo} alt="logo" maxHeight="100%"></Box>
        </Link>
    );
};

export default Logo;
