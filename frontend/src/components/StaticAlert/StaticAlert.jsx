import { Alert, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AlertContext, AlertTypes } from '~/context/AlertContext';

const StaticAlert = () => {
    const { message, showMessage, setShowMessage } = useContext(AlertContext);
    return (
        message.type === AlertTypes.STATIC &&
        showMessage && (
            <Alert
                severity={message.severity}
                onClose={() => setShowMessage(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Typography variant="h6">{message.text}</Typography>
            </Alert>
        )
    );
};

export default StaticAlert;
