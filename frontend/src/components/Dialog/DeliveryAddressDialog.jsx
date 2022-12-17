import { FormControl, FormControlLabel, Switch, Typography } from '@mui/material';
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

export default function DeliveryAddressDialog({ data, open, isDefault = false, handleClose }) {
    const [citys, setCitys] = useState([]);
    const [districts, setDistricts] = useState('');

    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    const [wards, setWards] = useState('');
    const [ward, setWard] = useState('');

    // const getCitys = () => {
    //     if (citys.length > 0) return;

    //     addressService.getCitys().then((res) => {
    //         setCitys(res.data);
    //         if (data) {
    //             setCity(citys.find((item) => item.name === data.city));
    //         }
    //     });
    // };
    useEffect(() => {
        // get citys when component is mounted
        addressService.getCitys().then((res) => {
            setCitys(res.data);
        });
    }, []);

    useEffect(() => {
        if (open) {
            // if dialog is open then set city from data
            data && setCity(citys.find((item) => item.name === data.addressWard.district.provinceCity.name));
        } else {
            // if dialog is closed then reset city
            setCity('');
        }
    }, [open]);

    useEffect(() => {
        if (city) {
            addressService.getDistricts(city.id).then((res) => {
                setDistricts(res.data);
                data && setDistrict(res.data.find((item) => item.name === data.addressWard.district.name) || '');
            });
        }
    }, [city]);

    useEffect(() => {
        if (district) {
            addressService.getWards(district.id).then((res) => {
                setWards(res.data);
                data && setWard(res.data.find((item) => item.name === data.addressWard.name) || '');
            });
        }
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
                    <FormControl sx={{ color: 'text.secondary' }}>
                        <FormControlLabel control={<Switch defaultChecked={isDefault} />} label="Set as default" />
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
