import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { themes } from '~/config';

const AppThemeProvider = ({ children }) => {
    return <ThemeProvider theme={themes}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
