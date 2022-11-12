import { createTheme } from '@mui/material/styles';
import constants from './constants';

const theme = createTheme({
    logo: {},

    typography: {
        body1: {
            ...constants.font,
        },
    },

    palette: {
        ...constants.color,
    },

    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             color: 'red',
        //         },
        //     },
        // },
        // MuiTabs: {
        //     styleOverrides: {
        //         indicator: {
        //             backgroundColor: 'transparent',
        //         },
        //     },
        // },
        // MuiTab: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: '#eee',
        //             borderRadius: 30,
        //             marginRight: '10px',
        //             marginTop: '10px',
        //             minHeight: '20px',
        //             minWidth: '60px',
        //             ':active': {
        //                 backgroundColor: 'black',
        //                 color: 'white',
        //             },
        //             ':focus': {
        //                 backgroundColor: 'black',
        //                 color: 'white',
        //             },
        //             ':selected': {
        //                 backgroundColor: 'black',
        //                 color: 'white',
        //             },
        //         },
        //         indicator: {
        //             backgroundColor: 'transparent',
        //         },
        //     },
        // },

        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 0px 2px 2px rgb(0 0 0 / 20%)',
                },
            },
        },
    },
});

export default theme;
