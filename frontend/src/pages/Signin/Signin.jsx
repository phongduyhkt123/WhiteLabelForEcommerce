import { Box, Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '~/components/Input';
import { route, signin } from '~/config';
import * as request from '~/utils/httpRequest';

import Logo from '~/components/Logo';
import StaticAlert from '~/components/StaticAlert/StaticAlert';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import AuthContainer from '~/layouts/components/AuthContainer';

const Signin = () => {
    const navigate = useNavigate();

    const { image, form, button, redirect, labels } = signin;
    const { setMessage, setShowMessage } = useContext(AlertContext);

    const location = useLocation();

    const [loginKey, setLoginKey] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const login = async (loginKey, password) => {
            try {
                const response = await request.post(route.signinAPI, {
                    loginKey,
                    password,
                });

                if (response.status === 200) {
                    const { token, type, userInfo } = response.data;
                    localStorage.setItem('auth', JSON.stringify({ token, type, userInfo }));
                    navigate(location.state || redirect || '/');
                } else {
                    console.log(response);
                    setMessage({
                        text: response?.detail?.message || 'Login failed',
                        severity: 'error',
                        type: AlertTypes.STATIC,
                    });
                    setShowMessage(true);
                }
            } catch (error) {
                setMessage({
                    text: error.response.data.detail.message || 'Something went wrong',
                    severity: 'error',
                    type: AlertTypes.STATIC,
                });
                setShowMessage(true);
                console.log(error);
            }
        };

        login(loginKey, password);
    };

    return (
        <>
            <AuthContainer>
                {/* Image Left */}
                {image && (
                    <Grid2 item xs={0} md={5}>
                        <Box component="img" src={image} alt="login form" maxWidth="100%" height={600} />
                    </Grid2>
                )}

                {/* Form */}
                <Grid2 item xs={12} md={7} my="auto">
                    <Stack spacing={4}>
                        {/* Logo */}
                        <Box display="flex">
                            <Logo />
                        </Box>

                        {/* Form */}
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h6" style={{ letterSpacing: '1px' }}>
                                {labels.signInToYourAccount}
                            </Typography>
                            <StaticAlert />
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                            >
                                <Input
                                    label={labels[form.loginKey.label]}
                                    type={form.loginKey.type}
                                    autoFocus
                                    required
                                    value={loginKey}
                                    handleChange={(e) => {
                                        setLoginKey(e.target.value);
                                    }}
                                />
                                <Input
                                    label={labels[form.password.label]}
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
                                    {labels[button.label]}
                                </Button>
                            </Box>
                        </Box>

                        {/* Forget Password */}
                        <Box display="flex" flexDirection="column">
                            <Typography component={Link} fontStyle="italic" to={'/forgotpassword'}>
                                {labels.forgotPassword}
                            </Typography>
                            <Typography component="p" style={{ color: '#393f81' }}>
                                {labels.dontHaveAccount}
                                <Typography component={Link} to={'/signup'} style={{ color: '#393f81' }}>
                                    {labels.signup}
                                </Typography>
                            </Typography>
                        </Box>
                    </Stack>
                </Grid2>
            </AuthContainer>
        </>
    );
};

export default Signin;
