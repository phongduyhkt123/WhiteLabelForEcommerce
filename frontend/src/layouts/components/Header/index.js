import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import { SliderCarousel } from '../Slider';
import { header } from '~/config';
import Action from './Action';
import Logo from '~/components/Logo';

import Navbar from './Navbar';

const Header = () => {
    return (
        <Box
            width="100%"
            height={90}
            display="flex"
            sx={{ ...header.styles, backgroundColor: 'white', py: 1 }}
            position="fixed"
            boxShadow="0 1px 1px rgb(0 0 0 / 12%)"
            zIndex="1000"
        >
            <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                sx={{ width: '90%', height: 50, margin: 'auto' }}
            >
                <Logo />
                <Navbar />
                <Action />
            </Stack>
        </Box>
    );
};

export default Header;
