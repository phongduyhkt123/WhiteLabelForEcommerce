import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoute, privateRoute } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { Fragment, useEffect } from 'react';
import { Box } from '@mui/system';

import 'slick-carousel/slick/slick.css'; // Add this line
import 'slick-carousel/slick/slick-theme.css'; // Add this line
import StoreAdmin from './pages/Admin/StoreAdmin';
import AuthRequire from '~/components/AuthRequire/AuthRequire';
import { NavigateSetter } from './components/NavigateSetter/NavigateSetter';
import ToastContainer from './components/ToastContainer/ToastContainer';
import AuthCheck from './pages/Signin/AuthCheck';
import { global } from '~/config';
import { useTheme } from '@mui/material';
import { defaultTheme } from 'react-admin';

function App() {
    const theme = useTheme();
    const aTheme = {
        ...defaultTheme,
        palette: {
            ...defaultTheme.palette,
            ...theme.palette,
        },
        typography: {
            ...defaultTheme.typography,
            fontSize: theme.typography.fontSize,
        },
    };

    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = global.favicon.src;
    }, []);

    return (
        <Box margin="auto">
            <Router>
                <NavigateSetter />
                <Box className="App">
                    <Routes>
                        {/* Public route */}
                        {publicRoute.map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout) Layout = route.layout;
                            else if (route.layout === null) Layout = Fragment;
                            const Page = route.element;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            {route.authCheck && <AuthCheck />} <Page title={route.title} />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {/* Private Route */}

                        {privateRoute.map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout) Layout = route.layout;
                            else if (route.layout === null) Layout = Fragment;
                            const Page = route.element;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <AuthRequire>
                                            <Layout>
                                                <Page title={route.title} />
                                            </Layout>
                                        </AuthRequire>
                                    }
                                />
                            );
                        })}

                        {/* React Admin */}
                        <Route path="/admin/*" element={<StoreAdmin aTheme={aTheme} />} />
                    </Routes>
                </Box>
            </Router>

            <ToastContainer />
        </Box>
    );
}

export default App;
