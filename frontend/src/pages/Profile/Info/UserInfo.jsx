import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Input, TextField } from '@mui/material';
import { profile } from '~/config';
import { defaultAvatar } from '~/assets/images';

const UserInfo = (props) => {
    const user = JSON.parse(localStorage.getItem('auth'))?.userInfo;

    const [values, setValues] = useState({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        avatar: user.avatar,
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const setAvatarPreview = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setValues({
                ...values,
                avatar: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form autoComplete="off" noValidate {...props} onSubmit={handleSubmit}>
            <Card>
                <CardHeader subheader="The information can be edited" title={profile.labels.profile} />
                <Divider />
                <CardContent>
                    <Box display="flex" alignItems="center" flexDirection="column" mb="4rem">
                        <Box
                            component="img"
                            src={values.avatar}
                            alt="avatar"
                            width="15rem"
                            border="1px solid #fff"
                            borderRadius="50%"
                            mb="2rem"
                            sx={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                            onClick={() => document.querySelector('input[type="file"]').click()}
                            onError={(e) => {
                                e.target.src = defaultAvatar;
                            }}
                        />
                        <Button variant="contained" component="label">
                            {profile.labels.changeAvatar}
                            <input type="file" accept=".jpg,.jpeg,.png" hidden onChange={(e) => setAvatarPreview(e)} />
                        </Button>
                    </Box>
                    <Grid container spacing={3}>
                        {profile.items.map((item, index) => (
                            <Grid item md={6} xs={12} key={index}>
                                <TextField
                                    {...item}
                                    fullWidth
                                    label={profile.labels[item.label]}
                                    onChange={handleChange}
                                    value={values[item.value] || ''}
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    {item.options?.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {profile.labels[label]}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Button color="primary" variant="contained">
                        {profile.labels.save}
                    </Button>
                </Box>
            </Card>
        </form>
    );
};

export default UserInfo;
