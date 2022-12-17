import { Typography } from '@mui/material';
import React from 'react';
import { commas } from '~/utils/formater';

const PriceWithDiscount = ({ price }) => {
    return (
        <Typography
            variant="body"
            pr={2}
            sx={{
                textDecorationLine: 'line-through',
                textDecorationThickness: '0.15rem',
                textDecorationColor: 'secondary.main',
            }}
        >
            {commas(price || 0)}
        </Typography>
    );
};

export default PriceWithDiscount;
