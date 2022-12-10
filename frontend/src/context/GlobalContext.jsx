import { useMediaQuery } from '@mui/material';
import { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [totalCartItem, setTotalCartItem] = useState(0);
    const userInfo = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).userInfo : null;

    // media query
    const isMobile = useMediaQuery('(max-width: 739px)');
    const isTablet = useMediaQuery('(min-width: 740px) and (max-width: 1023px)');
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const ectx = {
        totalCartItem,
        setTotalCartItem,
        userInfo,
        isMobile,
        isTablet,
        isDesktop,
    };

    return <GlobalContext.Provider value={ectx}>{children}</GlobalContext.Provider>;
};

export { GlobalProvider, GlobalContext };
