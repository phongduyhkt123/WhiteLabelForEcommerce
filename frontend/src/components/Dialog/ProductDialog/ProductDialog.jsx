import { FormControl, FormControlLabel, Switch } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '~/components/Select';

const ProductDialog = ({ data, open, handleClose }) => {
    return <Dialog open={open} onClose={handleClose}></Dialog>;
};

export default ProductDialog;
