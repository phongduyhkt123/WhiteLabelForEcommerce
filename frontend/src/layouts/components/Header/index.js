import { Box, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import { header } from '~/config';
import Action from './Action';
import Logo from '~/components/Logo';

import Navbar from './Navbar';
import Search from '~/components/Search';

const Header = ({ headerRef }) => {
    return (
        <Box
            ref={headerRef}
            width="100%"
            display="flex"
            flexDirection="column"
            sx={{ ...header.styles, backgroundColor: 'white', py: 1 }}
            position="fixed"
            boxShadow="0 1px 1px rgb(0 0 0 / 12%)"
            zIndex="1000"
        >
            <Stack direction="column" spacing={2} justifyContent="space-between" sx={{ width: '100%', margin: 'auto' }}>
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
                <Paper sx={{ p: 2 }}>
                    <Navbar />
                </Paper>
            </Stack>
        </Box>
    );
};

export default Header;
