import { grey, pink, indigo, blue, common } from '@mui/material/colors';

const constants = {
    color: {
        primary: {
            main: blue[800], //button outline text color, iconbutton text color, button container background color
            light: grey[100],
            dark: grey[100],
            contrastText: '#fff',
        },
        secondary: {
            main: grey[300],
        },
        success: {
            main: '#2dce89',
        },
        info: {
            main: '#11cdef',
        },
        warning: {
            main: '#fb6340',
        },
        danger: {
            main: '#f5365c',
        },
        logo: {
            main: grey[100],
        },
        background: {
            default: blue[100],
            paper: blue[200],
            white: common.white,
        },
        text: {
            primary: '#000', //text typhography color
            secondary: '#fff',
        },
        divider: blue[100],
        // mode: 'dark',
    },

    // background: {
    //     primary: {
    //         main: grey[100],
    //     },
    //     secondary: {
    //         main: blue[500],
    //     },
    //     success: {
    //         main: '#2dce89',
    //     },
    //     info: {
    //         main: '#11cdef',
    //     },
    //     warning: {
    //         main: '#fb6340',
    //     },
    //     danger: {
    //         main: '#f5365c',
    //     },
    //     logo: {
    //         main: grey[100],
    //     },
    // },

    font: { fontFamily: 'Roboto', fontSize: '1.5rem', fontWeight: 400 },

    logo: { url: 'https://i.imgur.com/4Q1YQqg.png', alt: 'logo', width: 100, height: 100 },
};

export default constants;
