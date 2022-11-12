import React from 'react';
import { NavLink } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';

const NavbarItem = ({ children, to, more }) => {
    return (
        <NavLink to={to} style={{ display: 'flex', alignItems: 'center' }}>
            <span>{children}</span>
            {more && <ExpandMore />}
        </NavLink>
    );
};

export default NavbarItem;
