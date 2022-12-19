import Logout from '@mui/icons-material/Logout';
import { Box, List } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Menu from '~/components/Menu';
import { route, header } from '~/config';
import Icon from '~/config/Store/Icon';
import { GlobalContext } from '~/context/GlobalContext';

export default function AccountMenu({ anchorEl, open, setOpen }) {
    const { profileMenu } = header;
    const { setTotalCartItem } = useContext(GlobalContext);

    const handleLogout = () => {
        localStorage.removeItem('auth');
        setTotalCartItem(0);
    };

    return (
        <Menu anchorEl={anchorEl} open={open} setOpen={setOpen}>
            <List>
                {profileMenu.items.map((item, index) => (
                    <MenuItem key={index}>
                        <Box component={Link} to={route[item.to].path} display="flex" alignItems="center">
                            <ListItemIcon>
                                <Icon component={item.icon} fontSize="small" />
                            </ListItemIcon>
                            {profileMenu.labels[item.title]}
                        </Box>
                    </MenuItem>
                ))}

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {profileMenu.labels.logout}
                </MenuItem>
            </List>
        </Menu>
    );
}
