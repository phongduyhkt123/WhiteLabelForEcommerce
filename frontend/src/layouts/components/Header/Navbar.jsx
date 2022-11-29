import { Divider, Stack, Typography } from '@mui/material';
import React, { Component } from 'react';
import { header } from '~/config';
import NavbarItem from './NavbarItem';

const Navbar = () => {
    const { navBar } = header;
    return (
        <Stack
            direction={'row'}
            spacing={2}
            alignItems="center"
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem sx={{ borderWidth: '0.8px' }} />}
        >
            {navBar.item.map((item, index) => (
                <NavbarItem item={item} key={index}>
                    <Typography variant="h4">{item.title}</Typography>
                </NavbarItem>
            ))}
        </Stack>
    );
};

export default Navbar;
