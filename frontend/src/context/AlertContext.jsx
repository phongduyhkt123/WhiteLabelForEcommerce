import { createContext, useState } from 'react';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [message, setMessage] = useState({ text: '', severity: '' });
    const [showMessage, setShowMessage] = useState(false);
    const ectx = {
        message,
        showMessage,
        setMessage,
        setShowMessage,
    };

    return <AlertContext.Provider value={ectx}>{children}</AlertContext.Provider>;
};

export { AlertProvider, AlertContext };
