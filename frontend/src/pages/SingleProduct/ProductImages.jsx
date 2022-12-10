import { Paper } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';

const ProductImages = ({ images }) => {
    const [previewImg, setPreviewImg] = useState();

    useEffect(() => {
        setPreviewImg({ id: images[0].id, url: images[0].url });
    }, []);

    return (
        <Grid2 item xs={12} md={6}>
            {previewImg && (
                <Paper sx={{ position: 'relative', py: 4, borderRadius: 0 }}>
                    <Grid2 containter display="flex">
                        {/* image list */}
                        <Grid2 item xs={2}>
                            <Stack
                                spacing={2}
                                alignItems="center"
                                maxHeight={500}
                                overflow="auto"
                                sx={{ direction: 'rtl' }}
                            >
                                {images.map((image) => (
                                    <Box
                                        key={image.id}
                                        component="img"
                                        onClick={() => setPreviewImg({ id: image.id, url: image.url })}
                                        src={image.url}
                                        alt=""
                                        height={80}
                                        width="100%"
                                        border={previewImg?.id === image.id ? '3px solid' : 'none'}
                                        sx={{
                                            objectFit: 'cover',
                                            opacity: image.id === previewImg.id ? 1 : 0.5,
                                            cursor: 'pointer',
                                            borderColor: 'primary.main',
                                            direction: 'ltr',
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Grid2>
                        {/* image preview */}
                        <Grid2 item xs={10}>
                            <Box
                                component="img"
                                src={previewImg?.url}
                                alt=""
                                width="100%"
                                maxHeight={700}
                                sx={{ objectFit: 'cover' }}
                            />
                        </Grid2>
                    </Grid2>
                </Paper>
            )}
        </Grid2>
    );
};

export default ProductImages;
