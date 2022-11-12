import { Alert } from '@mui/material';
import React from 'react';

const AlertMessage = ({ severity, children, ...rest }) => {
    return (
        <Alert severity={severity} {...rest}>
            {children}
        </Alert>
    );
};

export default AlertMessage;
