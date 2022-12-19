import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { singleProduct as singleProductConfig } from '~/config';

const ProductDescription = ({ description }) => {
    const labels = singleProductConfig.labels;

    const [descriptionExpand, setDescriptionExpand] = useState(false);

    const limitDescription = !descriptionExpand
        ? {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '5',
              WebkitBoxOrient: 'vertical',
          }
        : {};

    return (
        <Box>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <Typography variant="h5">{labels.description}</Typography>
                <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: description }}
                    /* new line with \n */
                    whiteSpace="pre-line"
                    sx={{
                        overflowWrap: 'break-word', // word break for long text
                        ...limitDescription,
                    }}
                />
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {descriptionExpand ? labels.collapse : labels.expand}
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default ProductDescription;
