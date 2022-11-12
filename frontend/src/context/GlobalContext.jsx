import { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [totalCartItem, setTotalCartItem] = useState(0);
    const ectx = {
        totalCartItem,
        setTotalCartItem,
    };

    return <GlobalContext.Provider value={ectx}>{children}</GlobalContext.Provider>;
};

export { GlobalProvider, GlobalContext };
