import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import { Box } from '@mui/material';

const DefaultLayout = ({ children }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" position="relative">
            <Header />
            <Box width="100%" mt="60px">
                <Box my={3} display="flex" justifyContent="center">
                    <Box width="90%" p={3} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                        {children}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default DefaultLayout;
