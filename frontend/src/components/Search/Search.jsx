import { Search as SearchIcon } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '~/config';

const Search = () => {
    const [key, setKey] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate(`${route.product.path}?key=${key}`);
        setKey('');
    };

    return (
        <>
            <Box display="flex">
                <TextField
                    variant="outlined"
                    onSubmit={handleSubmit}
                    sx={{ py: 0.2, width: '40vw' }}
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    InputProps={{ sx: { borderRadius: 8 } }}
                    inputProps={{ style: { paddingTop: 4 * 2.5, paddingBottom: 4 * 2.5 } }}
                ></TextField>
                <IconButton aria-label="search" sx={{ display: 'flex', margin: 'auto' }} onClick={handleSubmit}>
                    <SearchIcon color="primary" sx={{ fontSize: '2.5rem' }} />
                </IconButton>
            </Box>
        </>
    );
};

export default Search;
