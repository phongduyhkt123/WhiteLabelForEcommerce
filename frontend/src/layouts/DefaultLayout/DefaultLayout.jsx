import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const DefaultLayout = ({ children }) => {
    const headerRef = useRef();
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        setHeaderHeight(headerRef.current.clientHeight);
    }, [headerRef]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" position="relative">
            <Header headerRef={headerRef} />
            <Box width="100%" mt={`${headerHeight}px`}>
                <Box my={2} display="flex" justifyContent="center">
                    <Box width="100%" p={3} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                        {children}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default DefaultLayout;
