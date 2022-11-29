import { Search as SearchIcon } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';

const Search = () => {
    return (
        <>
            <Box display="flex" position="relative">
                <Box id="search" borderRadius={6} border={1} right="100%" bgcolor="background.default">
                    <TextField
                        variant="standard"
                        sx={{ display: 'flex', margin: 'auto', p: 1, width: 500 }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                </Box>
                <IconButton aria-label="search" sx={{ display: 'flex', margin: 'auto' }}>
                    <SearchIcon color="primary" sx={{ fontSize: '2.5rem' }} />
                </IconButton>
            </Box>
        </>
    );
};

export default Search;
