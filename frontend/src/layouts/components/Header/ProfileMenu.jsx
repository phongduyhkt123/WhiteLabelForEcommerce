import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { List, Paper, Popper } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '~/context/GlobalContext';
import { route } from '~/config';

export default function AccountMenu({ anchorEl, open, setOpen }) {
    const { setTotalCartItem } = useContext(GlobalContext);
    const auth = JSON.parse(localStorage.getItem('auth'));

    const handleLogout = () => {
        localStorage.removeItem('auth');
        setTotalCartItem(0);
    };

    return (
        <Popper
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={setOpen}
            onClick={setOpen}
            placement={'bottom-end'}
            disablePortal
        >
            <Paper
                sx={{
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                }}
            >
                <List>
                    <MenuItem>
                        <Link to={route.profile}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </List>
            </Paper>
        </Popper>
    );
}
