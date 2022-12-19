import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Typography, useMediaQuery } from '@mui/material';
import { Person, Receipt, Room, SignalCellularAlt } from '@mui/icons-material';
import { NavItem } from './NavItem';
import { Stack } from '@mui/system';
import { route } from '~/config';

const items = [
    {
        to: '/profile',
        icon: <SignalCellularAlt />,
        title: 'Profile',
    },
    {
        to: route.order.path,
        icon: <Receipt />,
        title: 'Orders',
    },
    {
        to: '/delivery-address',
        icon: <Room />,
        title: 'Delivery Address',
    },
];

const UserSidebar = (props) => {
    const { open, onClose } = props;
    const router = '';
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false,
    });

    const user = JSON.parse(localStorage.getItem('auth'))?.userInfo || {};

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            if (open) {
                onClose?.();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.asPath],
    );

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            {/* user card */}
            <Box display="flex" alignItems="center" py={2}>
                <Avatar>
                    <Person sx={{ fontSize: '4rem' }} />
                </Avatar>
                <Stack display="flex" flex={1} pl={2}>
                    <Typography variant="h5">{user?.fullname}</Typography>
                    <Typography variant="subtitle2"> {user?.username} </Typography>
                </Stack>
            </Box>
            <Divider />
            <Stack sx={{ flexGrow: 1 }} spacing={1} py={2}>
                {items.map((item, index) => (
                    <NavItem to={item.to} key={index} title={item.title} icon={item.icon} />
                ))}
            </Stack>
        </Box>
    );

    return <Box width="100%">{content}</Box>;
};

UserSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};

export default UserSidebar;
