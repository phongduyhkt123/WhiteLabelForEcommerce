import React from 'react';
import Slider from 'react-slick';
import './SliderCarousel.css';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {},
});

export default function SliderCarousel({ children, styles }) {
    // const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    //     <img src={LeftArrow} alt="prevArrow" {...props} />
    // );

    // const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    //     <img src={RightArrow} alt="nextArrow" {...props} />
    // );

    const settings_ = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const classes = useStyles();

    return (
        <Slider {...settings_} className={classes.root}>
            {children}
        </Slider>
    );
}