import { Box, Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '~/components/Input';
import { route, signup } from '~/config';
import * as request from '~/utils/httpRequest';

import Logo from '~/components/Logo';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import AuthContainer from '~/layouts/components/AuthContainer';

const Signup = () => {
    const fields = Object.entries(signup.form);

    const { setMessage, setShowMessage } = React.useContext(AlertContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.target).entries());

        request
            .post(route.signupAPI.url, payload)
            .then((res) => {
                console.log(res);
                setMessage({
                    text: 'Account created successfully',
                    severity: 'success',
                    type: AlertTypes.SNACKBAR_LARGE,
                });
            })
            .catch((err) => {
                setMessage({
                    text: err?.data?.message || 'Something went wrong',
                    severity: 'error',
                    type: AlertTypes.SNACKBAR_LARGE,
                });
            })
            .finally(() => {
                setShowMessage(true);
            });
    };

    return (
        <AuthContainer>
            {/* Image Left */}
            {signup.image && (
                <Grid2 item xs={0} md={6}>
                    <Box component="img" src={signup.image} alt="login form" maxWidth="100%" height={600} />
                </Grid2>
            )}

            <Grid2 item xs={12} md={6} my="auto">
                <Stack>
                    <Box display="flex">
                        <Logo />
                    </Box>

                    <Typography variant="h6" style={{ letterSpacing: '1px' }}>
                        {signup.labels.welcome}
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        {fields.map(([name, { label, ...props }], index) => (
                            <Input name={name} {...props} label={signup.labels[label]} key={index} />
                        ))}
                        <Button
                            size="large"
                            variant="outlined"
                            type="submit"
                            sx={{ fontSize: '1.8rem', minWidth: '50%', mx: 'auto' }}
                        >
                            {signup.labels.signup}
                        </Button>
                    </form>

                    <Typography component="p" style={{ color: '#393f81' }}>
                        {signup.labels.alreadyHaveAccount}
                        <Typography component={Link} to={'/signin'} style={{ color: '#393f81' }}>
                            {' '}
                            {signup.labels.signin}
                        </Typography>
                    </Typography>
                </Stack>
            </Grid2>
        </AuthContainer>
    );
};

export default Signup;
