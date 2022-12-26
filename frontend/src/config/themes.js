import constants from './constants';
import config from '~/data/config.json';
import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = createTheme({
    palette: {
        ...constants.color,
    },

    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    fontSize: constants.font.fontSize,
                },
            },
        },
        // change hover color
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState?.variant === 'contained' && {
                        '&:hover': {
                            backgroundColor: constants.color.primary.main,
                            opacity: 0.8,
                        },
                    }),
                }),
            },
        },

        ...config.global.components,
    },

    typography: {
        fontFamily: constants.font.fontFamily,
        fontSize: constants.font.fontSize * 1.4,
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
