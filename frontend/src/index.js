import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import AppThemeProvider from '~/themes/AppThemeProvider';
import { AlertProvider } from '~/context/AlertContext';
import { GlobalProvider } from './context/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AppThemeProvider>
            <AlertProvider>
                <GlobalProvider>
                    <CssBaseline />
                    <App />
                </GlobalProvider>
            </AlertProvider>
        </AppThemeProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
