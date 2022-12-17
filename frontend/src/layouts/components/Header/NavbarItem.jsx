import React, { useEffect, useRef, useState } from 'react';
import { createSearchParams, Link, NavLink, useNavigate } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';
import Menu from '~/components/Menu';
import * as request from '~/utils/httpRequest';
import { List, MenuItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        active: {
            borderBottom: `0.5rem solid ${theme.palette.primary.main}`,
        },
    };
});

const NavbarItem = ({ children, item, onClick }) => {
    const classes = useStyles();

    const { to, more } = item;
    const itemRef = useRef();
    const [openMenu, setOpenMenu] = useState(false);

    const handleOnClick = (e) => {
        if (more) {
            e.preventDefault();
            setOpenMenu(!openMenu);
        } else {
            onClick();
        }
    };

    const [subItems, setSubItems] = useState([]);
    useEffect(() => {
        item.api && request.get(item.api).then((res) => setSubItems(res.data.data));
    }, []);

    const navigate = useNavigate();

    const handleNavigate = (to, params = {}) => {
        navigate({
            pathname: to,
            search: createSearchParams(params).toString(),
        });
        onClick();
    };

    return (
        <>
            <NavLink
                to={to}
                ref={itemRef}
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={(e) => handleOnClick(e)}
                className={({ isActive }) => (isActive ? classes.active : '')}
                end
            >
                <span>{children}</span>
                {more && <ExpandMore />}
            </NavLink>
            {more && (
                <Menu anchorEl={itemRef.current} open={openMenu} setOpen={(e) => handleOnClick(e)}>
                    <List>
                        {subItems?.map((i, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    onClick={() => handleNavigate(item.subTo, { [item.subParams]: i.id })}
                                >
                                    <Typography>{i.name}</Typography>
                                </MenuItem>
                            );
                        })}
                    </List>
                </Menu>
            )}
        </>
    );
};

export default NavbarItem;
