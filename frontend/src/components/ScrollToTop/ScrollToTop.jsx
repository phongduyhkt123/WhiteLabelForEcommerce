import { KeyboardArrowUp } from '@mui/icons-material';
import { Fab, useScrollTrigger, Zoom } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback } from 'react';

const ScrollTop = () => {
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <Zoom in={trigger}>
            <Box
                role="presentation"
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 1,
                }}
            >
                <Fab onClick={scrollToTop} color="primary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </Box>
        </Zoom>
    );
};

export default ScrollTop;
