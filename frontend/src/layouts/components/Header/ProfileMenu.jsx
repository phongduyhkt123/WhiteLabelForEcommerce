import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { List, Paper, Popper } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '~/context/GlobalContext';
import { route } from '~/config';
import Menu from '~/components/Menu';

export default function AccountMenu({ anchorEl, open, setOpen }) {
    const { setTotalCartItem } = useContext(GlobalContext);
    const auth = JSON.parse(localStorage.getItem('auth'));

    const handleLogout = () => {
        localStorage.removeItem('auth');
        setTotalCartItem(0);
    };

    return (
        <Menu anchorEl={anchorEl} open={open} setOpen={setOpen}>
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
        </Menu>
    );
}
