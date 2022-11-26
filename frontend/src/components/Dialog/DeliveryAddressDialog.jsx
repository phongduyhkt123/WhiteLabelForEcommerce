import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Select from '~/components/Select';
import * as addressService from '~/services/addressService';

export default function DeliveryAddressDialog({ data, open, handleClose }) {
    const [citys, setCitys] = useState([]);
    const [districts, setDistricts] = useState('');

    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    const [wards, setWards] = useState('');
    const [ward, setWard] = useState('');

    const getCitys = () => {
        citys.length === 0 &&
            addressService.getCitys().then((res) => {
                setCitys(res.data);
            });
    };

    useEffect(() => {
        setDistrict('');
        city && addressService.getDistricts(city.id).then((res) => setDistricts(res.data));
    }, [city]);

    useEffect(() => {
        setWard('');
        district && addressService.getWards(district.id).then((res) => setWards(res.data));
    }, [district]);

    return (
        <Dialog open={open}>
            <DialogTitle>Delivery Address</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the form below to add a new delivery address</DialogContentText>
                <form>
                    <FormControl fullWidth>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Receiver Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={data.receiverName}
                            placeholder="Name of the receiver"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            margin="dense"
                            label="Receiver Phone"
                            type="tel"
                            fullWidth
                            variant="standard"
                            value={data.receiverPhone}
                            placeholder="Phone number of the receiver"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Select
                            margin="dense"
                            label="Province/City"
                            value={city}
                            options={citys}
                            defaultValue=""
                            fullWidth
                            onOpen={getCitys}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Select
                            value={district}
                            options={districts}
                            onChange={(e) => setDistrict(e.target.value)}
                            label="District"
                            fullWidth
                            margin="dense"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Select
                            margin="dense"
                            label="Ward"
                            value={ward}
                            options={wards}
                            fullWidth
                            onChange={(e) => setWard(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            margin="dense"
                            label="Address Detail"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={data.addressDetail}
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
