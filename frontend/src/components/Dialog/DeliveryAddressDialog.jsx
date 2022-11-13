import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function DeliveryAddressDialog({ data, open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delivery Address</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Receiver Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.receiverName}
                />
                <TextField
                    margin="dense"
                    label="Receiver Phone"
                    type="tel"
                    fullWidth
                    variant="standard"
                    value={data.receiverPhone}
                />
                <TextField
                    margin="dense"
                    label="Address Detail"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.addressDetail}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
