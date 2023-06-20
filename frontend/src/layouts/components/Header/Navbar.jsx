import { Reorder } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';
import { GlobalContext } from '~/context/GlobalContext';
import NavbarItem from './NavbarItem';
import { ConfigContext } from '~/context/ConfigContext';

const useStyles = makeStyles((theme) => ({
    hide: { display: 'none !important' },
    nav: {
        alignItems: 'center',
    },
    mobileNav: {
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 1px 1px rgb(0 0 0 / 12%)',
        padding: '4px 12px',
        backgroundColor: theme.palette.background.paper,
    },
}));

const Navbar = () => {
    const { header } = useContext(ConfigContext);

    const classes = useStyles();
    const { navBar } = header;

    const [hide, setHide] = useState(true);

    const { isMobile } = useContext(GlobalContext);

    return (
        <Box minHeight="3.5rem" display="flex">
            <IconButton size="small" className={!isMobile ? classes.hide : ''} onClick={() => setHide(!hide)}>
                <Reorder />
            </IconButton>
            <Stack
                direction={isMobile ? 'column' : 'row'}
                className={[isMobile ? classes.mobileNav : classes.nav, hide && isMobile && classes.hide].join(' ')}
                spacing={2}
                width="100%"
                sx={{ justifyContent: navBar.horizontal }}
                divider={<Divider orientation="vertical" flexItem />}
            >
                {navBar.item.map((item, index) => (
                    <NavbarItem item={item} key={index} onClick={() => setHide(!hide)}>
                        <Typography variant="h6">{item.title}</Typography>
                    </NavbarItem>
                ))}
            </Stack>
        </Box>
    );
};

export default Navbar;
