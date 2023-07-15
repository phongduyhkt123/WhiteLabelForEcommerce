import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ChatBot from '~/components/ChatBot/Chatbot';

const DefaultLayout = ({ children }) => {
    const [headerHeight, setHeaderHeight] = useState(0);

    const [hasChatBot, setHasChatBot] = useState(false);

    const heigth = document.getElementById('header')?.clientHeight;

    useEffect(() => {
        setHeaderHeight(heigth);
    }, [heigth]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" position="relative">
            <Header />
            <Box width="100%" mt={`${headerHeight}px`}>
                <Box my={2} display="flex" justifyContent="center">
                    <Box width="100%" p={1} sx={{ boxShadow: 1, bgcolor: 'background.white' }}>
                        {children}
                    </Box>
                </Box>
                <ChatBot />
            </Box>
            <Footer />
        </Box>
    );
};

export default DefaultLayout;
