import { Box, Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '~/components/Input';
import { signin } from '~/config/signin';
import * as request from '~/utils/httpRequest';

import AlertMessage from '~/components/Alert/AlertMessage';
import Logo from '~/components/Logo';
import { AlertContext } from '~/context/AlertContext';

const Signin = () => {
    const navigate = useNavigate();

    const { image, logo, title, form, button, redirect } = signin;
    const { message, setMessage, showMessage, setShowMessage } = useContext(AlertContext);

    const location = useLocation();

    const [loginKey, setLoginKey] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const login = async (loginKey, password) => {
            try {
                const response = await request.post('buyer/login', {
                    loginKey,
                    password,
                });

                if (response.status === 200) {
                    const { token, type, userInfo } = response.data;
                    localStorage.setItem('auth', JSON.stringify({ token, type, userInfo }));
                    navigate(location.state || redirect || '/');
                } else {
                    setMessage({ text: response?.data?.message || 'Something went wrong', severity: 'error' });
                    setShowMessage(true);
                }
            } catch (error) {
                setMessage({ text: error?.data?.message || 'Something went wrong', severity: 'error' });
                setShowMessage(true);
            }
        };

        login(loginKey, password);
    };

    return (
        <Box my={3} display="flex" justifyContent="center">
            <Box
                width="60%"
                p={3}
                sx={{
                    boxShadow: 2,
                    borderRadius: 3,
                    borderColor: 'primary.main',
                    borderWidth: 1,
                    borderStyle: 'solid',
                }}
            >
                <Grid2 container spacing={2}>
                    {/* Image Left */}
                    <Grid2 item md={6}>
                        <Box component="img" src={image} alt="login form" maxWidth="100%" height={600} />
                    </Grid2>

                    {/* Form */}
                    <Grid2 item md={6} my="auto">
                        <Stack spacing={4}>
                            {/* Logo */}
                            <Box display="flex">
                                <Logo />
                                <Typography fontWeight="bold" variant="h1">
                                    Logo
                                </Typography>
                            </Box>

                            {/* Form */}
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5" style={{ letterSpacing: '1px' }}>
                                    Sign into your account
                                </Typography>
                                {showMessage && <AlertMessage severity={message.severity}>{message.text}</AlertMessage>}
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        label={form.loginKey.label}
                                        type={form.loginKey.type}
                                        autoFocus
                                        required
                                        value={loginKey}
                                        handleChange={(e) => {
                                            setLoginKey(e.target.value);
                                        }}
                                    />
                                    <Input
                                        label="Password"
                                        type="password"
                                        required
                                        value={password}
                                        handleChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />

                                    <Button
                                        size="large"
                                        variant="outlined"
                                        type="submit"
                                        sx={{ fontSize: '1.8rem', minWidth: '50%', mx: 'auto' }}
                                    >
                                        {button.label}
                                    </Button>
                                </form>
                            </Box>

                            {/* Forget Password */}
                            <Box display="flex" flexDirection="column">
                                <Typography component={Link} fontStyle="italic" to={'/forgotpassword'}>
                                    Forgot password?
                                </Typography>
                                <Typography component="p" style={{ color: '#393f81' }}>
                                    Don't have an account?
                                    <Typography component={Link} to={'/signup'} style={{ color: '#393f81' }}>
                                        Register here
                                    </Typography>
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};

export default Signin;
