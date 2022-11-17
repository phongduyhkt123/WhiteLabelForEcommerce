import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

const Input = ({ name, handleChange, label, half, autoFocus, required, type }) => {
    const [type_, setType] = useState(type);

    const handleShowPassword = () => {
        setType(type_ === 'password' ? 'text' : 'password');
    };

    return (
        <Grid2 item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required={required}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type_}
                sx={{
                    label: {
                        color: '#000',
                        opacity: 0.6,
                    },
                }}
                InputProps={
                    name === 'password'
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton onClick={handleShowPassword}>
                                          {type === 'password' ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }
                        : null
                }
            />
        </Grid2>
    );
};

export default Input;
