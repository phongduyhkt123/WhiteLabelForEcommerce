import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import { Box } from '@mui/material';
import UserSideBar from '../components/Sidebar/UserSideBar';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useRef, useState } from 'react';

const UserProfileLayout = ({ children }) => {
    const headerRef = useRef();
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        setHeaderHeight(headerRef.current.clientHeight);
    }, [headerRef]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" position="relative">
            <Header headerRef={headerRef} />
            <Box width="100%" mt={`${headerHeight}px`}>
                <Box my={3} display="flex" justifyContent="center">
                    <Box width="90%" p={3} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                        <Grid2 container minHeight="90vh" spacing={8}>
                            <Grid2 item md={3}>
                                <UserSideBar />
                            </Grid2>
                            <Grid2 item md={9}>
                                {children}
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>
            </Box>

            <Footer />
        </Box>
    );
};

export default UserProfileLayout;
