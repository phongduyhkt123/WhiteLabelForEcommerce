import { Badge, Stack, TextField } from '@mui/material';

import { Person, Search, ShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { route } from '~/config';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '~/context/GlobalContext';
import * as request from '~/utils/httpRequest';

const Action = () => {
    const { totalCartItem, setTotalCartItem } = useContext(GlobalContext);
    const auth = JSON.parse(localStorage.getItem('auth'));

    const handleLogout = () => {
        localStorage.removeItem('auth');
        setTotalCartItem(0);
    };

    const getTotalCartItem = async () => {
        const res = await request.get(route.countCartAPI);
        setTotalCartItem(res.data.data);
    };

    useEffect(() => {
        getTotalCartItem();
    }, []);

    return (
        <Stack direction={'row'} gap={1}>
            <Box display="flex" position="relative">
                <IconButton
                    aria-label="search"
                    sx={{ display: 'flex', margin: 'auto' }}
                    onClick={() => {
                        const search = document.getElementById('search');
                        search.toggleAttribute('hidden');
                    }}
                >
                    <Search color="primary" sx={{ fontSize: '2.5rem' }} />
                </IconButton>
                <Box
                    id="search"
                    borderRadius={6}
                    border={1}
                    position="absolute"
                    right="100%"
                    hidden
                    bgcolor="background.default"
                >
                    <TextField
                        variant="standard"
                        sx={{ display: 'flex', margin: 'auto', p: 1, width: 300 }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                </Box>
            </Box>
            <IconButton LinkComponent={Link} aria-label="cart" to={route.cart} sx={{ display: 'flex', margin: 'auto' }}>
                <Badge badgeContent={totalCartItem} color="primary">
                    <ShoppingCart color="primary" sx={{ fontSize: '2.5rem' }} />
                </Badge>
            </IconButton>
            <IconButton
                LinkComponent={Link}
                aria-label="account"
                to={auth ? route.profile : route.signin}
                sx={{ display: 'flex', margin: 'auto' }}
            >
                <Person color="primary" sx={{ fontSize: '2.5rem' }} />
            </IconButton>
        </Stack>
    );
};

export default Action;
