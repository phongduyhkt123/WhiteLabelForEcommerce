import { InputLabel, MenuItem } from '@mui/material';
import React from 'react';
import { Select as MUISelect } from '@mui/material';

const Select = ({ value, options, onChange, label, ...rest }) => {
    return (
        <>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <MUISelect label={label} value={value} onChange={onChange} {...rest}>
                {options &&
                    options.map((item, index) => (
                        <MenuItem value={item} key={item.id || index}>
                            {item.name}
                        </MenuItem>
                    ))}
            </MUISelect>
        </>
    );
};

export default Select;
