import { Reorder } from '@mui/icons-material';
import { Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';
import { header } from '~/config';
import { GlobalContext } from '~/context/GlobalContext';
import NavbarItem from './NavbarItem';

const useStyles = makeStyles((theme) => ({
    hide: { display: 'none !important' },
    nav: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileNav: {
        display: 'none',
        width: '40%',
        textAlign: 'left',
        padding: '4px 12px',
        backgroundColor: theme.palette.background.paper,
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const { navBar } = header;
    const [hide, setHide] = useState(true);

    const { isMobile } = useContext(GlobalContext);
    console.log(hide);

    return (
        <div style={{ height: '3.5rem' }}>
            <IconButton size="small" className={!isMobile ? classes.hide : ''} onClick={() => setHide(!hide)}>
                <Reorder />
            </IconButton>
            <Stack
                direction={isMobile ? 'column' : 'row'}
                className={[isMobile ? classes.mobileNav : classes.nav, hide && isMobile && classes.hide].join(' ')}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                {navBar.item.map((item, index) => (
                    <NavbarItem item={item} key={index} onClick={() => setHide(!hide)}>
                        <Typography variant="h6">{item.title}</Typography>
                    </NavbarItem>
                ))}
            </Stack>
        </div>
    );
};

export default Navbar;
