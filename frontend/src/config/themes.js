import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import constants from './constants';
import config from '~/data/config.json';

const theme = createTheme({
    palette: {
        ...constants.color,
    },

    components: config.global.components,

    typography: {
        fontFamily: constants.font.fontFamily,
        htmlFontSize: 10,
        fontSize: constants.font.fontSize,
    },
});

export default responsiveFontSizes(theme);

// logo: {},

// typography: {
//     body1: {
//         ...constants.font,
//     },
// },

// palette: {
//     ...constants.color,
// },

// components: {
//     MuiButton: {
//         defaultProps: {
//             sx: {
//                 fontSize: '1.3rem',
//             },
//         },
//     },

//     MuiPaginationItem: {
//         styleOverrides: {
//             root: {
//                 fontSize: '1.3rem',
//             },
//         },
//     },
//     // MuiTabs: {
//     //     styleOverrides: {
//     //         indicator: {
//     //             backgroundColor: 'transparent',
//     //         },
//     //     },
//     // },
//     // MuiTab: {
//     //     styleOverrides: {
//     //         root: {
//     //             backgroundColor: '#eee',
//     //             borderRadius: 30,
//     //             marginRight: '10px',
//     //             marginTop: '10px',
//     //             minHeight: '20px',
//     //             minWidth: '60px',
//     //             ':active': {
//     //                 backgroundColor: 'black',
//     //                 color: 'white',
//     //             },
//     //             ':focus': {
//     //                 backgroundColor: 'black',
//     //                 color: 'white',
//     //             },
//     //             ':selected': {
//     //                 backgroundColor: 'black',
//     //                 color: 'white',
//     //             },
//     //         },
//     //         indicator: {
//     //             backgroundColor: 'transparent',
//     //         },
//     //     },
//     // },

//     MuiCard: {
//         styleOverrides: {
//             root: {
//                 boxShadow: '0px 0px 2px 2px rgb(0 0 0 / 20%)',
//             },
//         },
//     },
// },
