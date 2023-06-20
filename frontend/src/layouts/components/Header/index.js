import { Box, Paper } from '@mui/material';
import { Stack } from '@mui/system';
// import { header } from '~/config';
import Action from './Action';
import Logo from '~/components/Logo';

import Navbar from './Navbar';
import Search from '~/components/Search';
import { useContext } from 'react';
import { ConfigContext } from '~/context/ConfigContext';

const Header = ({ headerRef }) => {
    const { header } = useContext(ConfigContext);

    return (
        <Box
            ref={headerRef}
            id="header"
            width="100%"
            display="flex"
            flexDirection="column"
            sx={{ ...header.styles, backgroundColor: 'white', py: 0.2 }}
            position="fixed"
            boxShadow="0 1px 1px rgb(0 0 0 / 12%)"
            zIndex="1000"
        >
            <Stack
                spacing={1}
                justifyContent="space-between"
                sx={{ width: '100%', margin: 'auto' }}
                flexDirection={header.navBar?.vertical === 'top' ? 'column-reverse' : 'column'}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: '90%', margin: 'auto' }}
                >
                    <Logo />
                    <Search />
                    <Action />
                </Stack>
                <Paper sx={{ p: 0.5 }}>
                    <Navbar />
                </Paper>
            </Stack>
        </Box>
    );
};

export default Header;
