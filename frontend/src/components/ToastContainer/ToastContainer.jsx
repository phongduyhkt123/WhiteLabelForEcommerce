import { Alert, Snackbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AlertContext, AlertTypes } from '~/context/AlertContext';

const ToastContainer = () => {
    const { message, showMessage, setShowMessage } = useContext(AlertContext);

    const style =
        message.type === AlertTypes.SNACKBAR_LARGE
            ? {
                  width: '40rem',
                  height: '16rem',
                  top: '50%',
                  transform: 'translateX(-50%) translateY(-50%)  !important',
              }
            : {};

    return (
        message.type !== AlertTypes.STATIC && (
            <Snackbar
                open={showMessage}
                autoHideDuration={4000}
                onClose={() => setShowMessage(false)}
                anchorOrigin={
                    message.type === AlertTypes.SNACKBAR_LARGE
                        ? { vertical: 'bottom', horizontal: 'center' }
                        : { vertical: 'bottom', horizontal: 'right' }
                }
                sx={style}
            >
                <Alert
                    severity={message.severity}
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h5">{message.text}</Typography>
                </Alert>
            </Snackbar>
        )
    );
};

export default ToastContainer;
