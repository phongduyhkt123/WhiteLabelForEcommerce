import { Grid, List, ListItemText, Typography, Button, Stack, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { footer } from '~/config';

export default function Footer() {
    const { styles, font, logo, items, copyRight } = footer;

    return (
        <Paper sx={{ height: 200, ...styles, position: 'absolute', bottom: 0, top: '100%', right: 0, left: 0 }}>
            <Stack
                sx={{
                    py: 4,
                }}
            >
                <Grid container spacing={2} justifyContent="space-around" width="90%" margin="auto">
                    {items.map((item, index) => (
                        <Grid item md={6} lg={4} key={index}>
                            <Stack spacing={1}>
                                <Typography variant="body1" textAlign="center">
                                    {item.title}
                                </Typography>
                                {item.subItems.map((s, idx) => {
                                    const Icon = s?.icon;
                                    return (
                                        <Box display="flex" alignItems="center" justifyContent="center" key={idx}>
                                            {Icon && Icon}
                                            <Typography variant="caption2" key={idx}>
                                                {s.content}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="caption2" textAlign="right" padding="8px">
                    {copyRight.content}
                </Typography>
            </Stack>
        </Paper>
    );
}
