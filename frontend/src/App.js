import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { publicRoute, privateRoute } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { Fragment, useContext, useEffect } from 'react';
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
import { ConfigContext } from './context/ConfigContext';
import OAuth2Redirect from './pages/Signin/OAuth2Redirect';
import AnimationRoutes from './components/AnimationRoutes/AnimationRoutes';

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
        components: {
            ...defaultTheme.components,
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined',
                    InputProps: {
                        style: { padding: '10px 14px' },
                    },
                    inputProps: {
                        style: { padding: '10px 14px' },
                    },
                },
            },
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

    const config = useContext(ConfigContext);

    return (
        <Box margin="auto">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
                />
            </head>
            <div>
                <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
                <df-messenger
                    intent="WELCOME"
                    chat-title="Assistant"
                    agent-id="ce3f48ce-4a10-4fa0-9e02-e472d23100a7"
                    language-code="en"
                ></df-messenger>
                {config && (
                    <Router>
                        <NavigateSetter />
                        <Box className="App">
                            <AnimationRoutes>
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

                                {/* oAuth2 result callback */}
                                <Route path="/oauth2/callback" element={<OAuth2Redirect />} />

                                {/* React Admin */}
                                <Route path="/admin/*" element={<StoreAdmin aTheme={aTheme} />} />
                            </AnimationRoutes>
                        </Box>
                    </Router>
                )}
            </div>

            <ToastContainer />
        </Box>
    );
}

export default App;
