import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetailItem = () => {
    return (
        <Box>
            <Grid container>
                {/* image */}
                <Grid item xs={2} display="flex">
                    <Box
                        component="img"
                        src="https://tmdl.edu.vn/wp-content/uploads/2022/06/Dasha-Taran-la-ai.jpg"
                        alt=""
                        height={80}
                        sx={{ objectFit: 'cover' }}
                    />
                </Grid>
                {/* info */}
                <Grid item xs={9} display="flex" justifyContent="space-around" alignItems="center">
                    <Typography variant="h4" component={Link}>
                        product name
                    </Typography>
                    <Typography>2000000 d</Typography>
                    {/* quantity */}

                    <Typography px={2}>3</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderDetailItem;
