import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { themes } from '~/config';

const AppThemeProvider = ({ children }) => {
    const appThemes = responsiveFontSizes(createTheme(themes));

    return <ThemeProvider theme={appThemes}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
