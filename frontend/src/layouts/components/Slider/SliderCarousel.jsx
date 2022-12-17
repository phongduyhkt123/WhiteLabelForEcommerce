import React, { useContext } from 'react';
import Slider from 'react-slick';
import './SliderCarousel.css';
import { makeStyles } from '@mui/styles';
import { GlobalContext } from '~/context/GlobalContext';

const useStyles = makeStyles({
    root: {},
});

export default function SliderCarousel({ children, isMobile }) {
    // const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    //     <img src={LeftArrow} alt="prevArrow" {...props} />
    // );

    // const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    //     <img src={RightArrow} alt="nextArrow" {...props} />
    // );

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        arrows: !isMobile,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    const classes = useStyles();

    return (
        <Slider {...settings} className={classes.root}>
            {children}
        </Slider>
    );
}
