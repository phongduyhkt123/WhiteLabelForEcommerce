import { Box, Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import Input from '~/components/Input';

import Logo from '~/components/Logo';

const Signup = () => {
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
                    <Grid2 item md={6}>
                        <Box
                            component="img"
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                            alt="login form"
                            maxWidth="100%"
                            height={600}
                        />
                    </Grid2>

                    <Grid2 item md={6} my="auto">
                        <Stack>
                            <Box display="flex">
                                <Logo />
                                <Typography fontWeight="bold" variant="h1">
                                    Logo
                                </Typography>
                            </Box>

                            <Typography variant="h5" style={{ letterSpacing: '1px' }}>
                                Welcom to our community
                            </Typography>

                            <Input label="Full name" type="text" autoFocus required />
                            <Input label="Phone number" type="tel" required />
                            <Input label="Email address" type="email" required />
                            <Input label="Password" type="password" required />
                            <Input label="Confirm password" type="password" required />

                            <Button
                                size="large"
                                variant="outlined"
                                sx={{ fontSize: '1.8rem', minWidth: '50%', mx: 'auto' }}
                            >
                                Register
                            </Button>
                            <Typography component="p" style={{ color: '#393f81' }}>
                                Already have an account?
                                <Typography component={Link} to={'/signin'} style={{ color: '#393f81' }}>
                                    Login here
                                </Typography>
                            </Typography>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};

export default Signup;
