import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

const ConfigDialog = ({ children, open = false, onSubmit = () => {}, onCancel = () => {} }) => {
    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Delivery Address</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the form below to add a new delivery address</DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onSubmit}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfigDialog;
