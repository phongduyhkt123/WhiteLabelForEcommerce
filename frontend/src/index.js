import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import AppThemeProvider from '~/themes/AppThemeProvider';
import { AlertProvider } from '~/context/AlertContext';
import { GlobalProvider } from './context/GlobalContext';
import './assets/fonts/Lato/Lato-Bold.ttf';
import './assets/fonts/Lato/Lato-Regular.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <GlobalProvider>
            <AppThemeProvider>
                <AlertProvider>
                    <CssBaseline />
                    <App />
                </AlertProvider>
            </AppThemeProvider>
        </GlobalProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
