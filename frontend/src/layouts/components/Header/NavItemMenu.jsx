import { Popover, Typography } from '@mui/material';
import React from 'react';

const NavItemMenu = ({ anchorEl, open, setOpen }) => {
    return (
        <Popover
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={setOpen}
            disableRestoreFocus
        >
            <Typography sx={{ p: 1 }}>I use Popover.</Typography>
        </Popover>
    );
};

export default NavItemMenu;
