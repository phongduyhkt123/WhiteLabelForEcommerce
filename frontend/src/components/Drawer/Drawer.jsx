import { Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

const Drawer = ({ children, title = 'config', ...rest }) => {
    const [isShow, setIsShow] = React.useState(false);

    return (
        <Box
            minHeight={40}
            bgcolor="background.white"
            padding={1}
            borderRadius={4}
            style={{ cursor: 'pointer' }}
            border="1px solid #e0e0e0"
            {...rest}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between" onClick={() => setIsShow(!isShow)}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', padding: '10px 20px' }}>
                    {title}
                </Typography>
                {/* add an icon here */}
                <KeyboardArrowDownIcon />
            </Box>
            <Box display={isShow ? 'flex' : 'none'}>
                <Box padding={2} width="100%">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Drawer;
