import { FormControl, FormControlLabel, Switch } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import Select from '~/components/Select';
import { deliveryAddress, route } from '~/config';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import * as addressService from '~/services/addressService';
import * as request from '~/utils/httpRequest';

export default function DeliveryAddressDialog({ data, open, isDefault = false, handleClose, setDeliveryAddresses }) {
    const { setMessage, setShowMessage } = useContext(AlertContext);

    const [citys, setCitys] = useState([]);
    const [districts, setDistricts] = useState('');

    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    const [wards, setWards] = useState('');
    const [ward, setWard] = useState('');

    useEffect(() => {
        // get citys when component is mounted
        addressService.getCitys().then((res) => {
            setCitys(res.data);
        });
    }, []);

    useEffect(() => {
        if (open) {
            // if dialog is open then set city from data
            data && setCity(citys.find((item) => item.name === data.ward.district.province.provinceName));
        } else {
            // if dialog is closed then reset city
            setCity('');
        }
    }, [open]);

    useEffect(() => {
        if (city) {
            addressService.getDistricts(city.id).then((res) => {
                setDistricts(res.data);
                data && setDistrict(res.data.find((item) => item.name === data.ward.district.districtName) || '');
            });
        }
    }, [city]);

    useEffect(() => {
        if (district) {
            addressService.getWards(district.id).then((res) => {
                setWards(res.data);
                data && setWard(res.data.find((item) => item.name === data.ward.wardName) || '');
            });
        }
    }, [district]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let params = {
            ...Object.fromEntries(new FormData(e.target)),
        };
        params['isDefault'] = e.target.isDefault.checked; // unless value is not boolean ("on")

        params = {
            ...params,
            wardCode: ward?.id,
            wardName: ward?.name,
            districtID: district?.id,
            districtName: district?.name,
            provinceID: city?.id,
            provinceName: city?.name,
        };

        const id = data?.id;

        const { data: data_, message } = await addressService.saveAddress({ params, id });
        if (data_) {
            if (id) {
                // update
                setDeliveryAddresses((prev) => prev.map((item) => (item.id === id ? data_ : item)));
            } else {
                // create
                setDeliveryAddresses((prev) => [...prev, data_]);
            }
            handleClose();
        }
        setMessage(message);
        setShowMessage(true);
    };

    return (
        <Dialog open={open}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Delivery Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>Fill in the form below to add a new delivery address</DialogContentText>
                    <FormControl fullWidth>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Receiver Name"
                            type="text"
                            name="receiverName"
                            required
                            fullWidth
                            variant="standard"
                            defaultValue={data?.receiverName}
                            placeholder="Name of the receiver"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            margin="dense"
                            label="Receiver Phone"
                            type="tel"
                            name="receiverPhone"
                            required
                            fullWidth
                            variant="standard"
                            defaultValue={data.receiverPhone}
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
                            required
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
                            required
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
                            required
                            onChange={(e) => setWard(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            margin="dense"
                            label="Address Detail"
                            type="text"
                            name="addressDetail"
                            required
                            fullWidth
                            variant="standard"
                            defaultValue={data.addressDetail}
                        />
                    </FormControl>
                    <FormControl sx={{ color: 'text.secondary' }}>
                        <FormControlLabel
                            control={<Switch defaultValue={isDefault} name="isDefault" />}
                            label="Set as default"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
