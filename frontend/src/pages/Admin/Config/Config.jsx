import { TextField, Typography } from '@mui/material';

export const Config = ({ item, field, onChange, value, keys }) => {
    return (
        <>
            <Typography variant="h6" color="primary" m="auto">
                {item}
            </Typography>
            {keys.map((i) => {
                return <TextField label={i} multiline key={i} defaultValue={value} onChange={onChange} />;
            })}
        </>
    );
};
