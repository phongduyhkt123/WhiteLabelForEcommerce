import { Search as SearchIcon } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';

const Search = () => {
    return (
        <>
            <Box display="flex">
                <TextField
                    variant="outlined"
                    sx={{ py: 0.2, width: '40vw' }}
                    InputProps={{ sx: { borderRadius: 8 } }}
                    inputProps={{ style: { paddingTop: 4 * 2.5, paddingBottom: 4 * 2.5 } }}
                ></TextField>
                <IconButton aria-label="search" sx={{ display: 'flex', margin: 'auto' }}>
                    <SearchIcon color="primary" sx={{ fontSize: '2.5rem' }} />
                </IconButton>
            </Box>
        </>
    );
};

export default Search;
