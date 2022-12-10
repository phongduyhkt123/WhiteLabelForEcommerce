import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useState } from 'react';
import { IconButton } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SlideBanner({ images }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box width="100%" display="flex" flexDirection="column" position="relative">
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                width="100%"
            >
                {images.map((image, index) => (
                    <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    aspectRatio: '16 / 6',
                                    display: 'block',
                                    objectFit: 'cover',
                                    width: '100%',
                                }}
                                {...image}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{ justifyContent: 'center' }}
            />
            <IconButton
                onClick={handleBack}
                sx={{ position: 'absolute', top: '40%', left: 0, bgcolor: 'background.default' }}
                color="primary"
                disabled={activeStep === 0}
            >
                <KeyboardArrowLeft />
            </IconButton>

            <IconButton
                onClick={handleNext}
                sx={{ position: 'absolute', top: '40%', right: 0, bgcolor: 'background.default' }}
                disabled={activeStep === maxSteps - 1}
                color="primary"
            >
                <KeyboardArrowRight />
            </IconButton>
        </Box>
    );
}

export default SlideBanner;
