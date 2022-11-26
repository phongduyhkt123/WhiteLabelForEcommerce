import { createContext, useState } from 'react';

const AlertContext = createContext();

const AlertTypes = {
    STATIC: 'STATIC',
    SNACKBAR_SMALL: 'SNACKBAR_SMALL',
    SNACKBAR_LARGE: 'SNACKBAR_LARGE',
};

const AlertProvider = ({ children }) => {
    const [message, setMessage] = useState({ text: '', severity: 'info', type: AlertTypes.SNACKBAR_SMALL });
    const [showMessage, setShowMessage] = useState(false);
    const ectx = {
        message,
        showMessage,
        setMessage,
        setShowMessage,
    };

    return <AlertContext.Provider value={ectx}>{children}</AlertContext.Provider>;
};

export { AlertProvider, AlertContext, AlertTypes };
