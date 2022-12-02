import { Paper, Popper } from '@mui/material';
import React from 'react';

const Menu = ({ children, anchorEl, open, setOpen = () => {} }) => {
    return (
        <Popper
            anchorEl={anchorEl}
            open={open}
            onClose={setOpen}
            onClick={setOpen}
            placement={'bottom-end'}
            disablePortal
            style={{ margin: 0 }}
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
                {children}
            </Paper>
        </Popper>
    );
};

export default Menu;
