import { Box, Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '~/components/Input';
import { signup } from '~/config';
import * as request from '~/utils/httpRequest';

import Logo from '~/components/Logo';
import { AlertContext } from '~/context/AlertContext';

const Signup = () => {
    const fields = Object.entries(signup.form);

    const { message, setMessage, showMessage, setShowMessage } = React.useContext(AlertContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.target).entries());

        try {
            const response = await request.post('buyer/signup', payload);
            if (response.status === 200) {
                setMessage({ text: 'Account created successfully', severity: 'success' });
                navigate('/signin');
            } else {
                setMessage({ text: response?.data?.message || 'Something went wrong', severity: 'error' });
            }
        } catch (error) {
            setMessage({ text: error?.data?.message || 'Something went wrong', severity: 'error' });
        }
        setShowMessage(true);
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
                            <form onSubmit={handleSubmit}>
                                {fields.map(([name, props], index) => (
                                    <Input name={name} {...props} key={index} />
                                ))}
                                <Button
                                    size="large"
                                    variant="outlined"
                                    type="submit"
                                    sx={{ fontSize: '1.8rem', minWidth: '50%', mx: 'auto' }}
                                >
                                    Register
                                </Button>
                            </form>

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
