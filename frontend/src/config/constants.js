import { grey, pink, indigo, blue, common } from '@mui/material/colors';
import config from '~/data/config.json';

const constants = {
    color: config.global.color,

    font: config.global.font,

    logo: config.global.logo,
};

export default constants;

// primary: {
//     main: blue[800], //button outline text color, iconbutton text color, button container background color
//     light: grey[100],
//     dark: grey[100],
//     contrastText: '#fff',
// },
// secondary: {
//     main: grey[300],
// },
// success: {
//     main: '#2dce89',
// },
// info: {
//     main: '#11cdef',
// },
// warning: {
//     main: '#fb6340',
// },
// danger: {
//     main: '#f5365c',
// },
// background: {
//     default: blue[100], // for box ...
//     paper: blue[200], // for paper
//     white: common.white,
// },
// text: {
//     primary: '#000', //text typhography color
//     secondary: '#fff',
// },
// divider: blue[100],
// // mode: 'dark',
