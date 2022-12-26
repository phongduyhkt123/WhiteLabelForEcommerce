import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { themes } from '~/config';

const AppThemeProvider = ({ children }) => {
    return <ThemeProvider theme={themes}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
