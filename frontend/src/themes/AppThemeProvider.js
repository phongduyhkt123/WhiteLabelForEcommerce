import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '~/context/ConfigContext';

const AppThemeProvider = ({ children }) => {
    const config = useContext(ConfigContext);

    const [theme, setTheme] = useState(createTheme());

    useEffect(() => {
        if (config) {
            setTheme(
                createTheme({
                    palette: {
                        ...config.global.color,
                    },

                    components: {
                        MuiContainer: {
                            styleOverrides: {
                                root: {
                                    fontSize: config.global.font.fontSize,
                                },
                            },
                        },
                        // change hover color
                        MuiButton: {
                            styleOverrides: {
                                root: ({ ownerState }) => ({
                                    ...(ownerState?.variant === 'contained' && {
                                        '&:hover': {
                                            backgroundColor: config.global.color.primary.main,
                                            opacity: 0.8,
                                        },
                                    }),
                                }),
                            },
                        },

                        ...config.global.components,
                    },

                    typography: {
                        fontFamily: config.global.font.fontFamily,
                        fontSize: config.global.font.fontSize * 1.4,
                    },
                }),
            );
        }
    }, [config]);

    return <ThemeProvider theme={responsiveFontSizes(theme)}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
