import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';

const AuthContainer = ({ children }) => {
    return (
        <Grid2 my={3} container justifyContent="center">
            <Grid2
                p={3}
                xs={12}
                md={8}
                lg={6}
                item
                sx={{
                    boxShadow: 2,
                    borderRadius: 3,
                    borderColor: 'primary.main',
                    borderWidth: 1,
                    borderStyle: 'solid',
                }}
            >
                <Grid2 container spacing={2} justifyContent="center">
                    {children}
                </Grid2>
            </Grid2>
        </Grid2>
    );
};
export default AuthContainer;
