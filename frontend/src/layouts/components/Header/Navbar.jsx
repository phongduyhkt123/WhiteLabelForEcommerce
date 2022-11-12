import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { header } from '~/config';
import NavbarItem from './NavbarItem';

const Navbar = () => {
    const { navBar } = header;
    return (
        <Stack
            direction={'row'}
            spacing={2}
            alignItems="center"
            divider={<Divider orientation="vertical" sx={{ borderWidth: '0.8px' }} />}
        >
            {navBar.item.map((item, index) => (
                <NavbarItem to={item.url} key={index} more={item.more}>
                    <Typography variant={'h5'}>{item.title}</Typography>
                </NavbarItem>
            ))}
        </Stack>
    );
};

export default Navbar;
