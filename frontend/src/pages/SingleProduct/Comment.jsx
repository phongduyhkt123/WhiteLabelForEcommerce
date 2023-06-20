import { Avatar, Box, Rating, Typography } from '@mui/material';

const Comment = ({ rating, avatar, name, content, time = '2021-10-10' }) => {
    return (
        <Box display="flex">
            <Avatar sx={{ mr: 2 }}></Avatar>
            <Box>
                <Typography>{name}</Typography>
                <Rating name="simple-controlled" size="small" value={rating} readOnly />
                <Typography fontStyle="italic">{time}</Typography>
                <Typography>{content}</Typography>
            </Box>
        </Box>
    );
};

export default Comment;
