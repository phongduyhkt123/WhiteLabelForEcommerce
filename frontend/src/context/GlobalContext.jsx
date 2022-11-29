import { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [totalCartItem, setTotalCartItem] = useState(0);
    const userInfo = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).userInfo : null;
    const ectx = {
        totalCartItem,
        setTotalCartItem,
        userInfo,
    };

    return <GlobalContext.Provider value={ectx}>{children}</GlobalContext.Provider>;
};

export { GlobalProvider, GlobalContext };
