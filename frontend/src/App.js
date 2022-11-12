import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoute, privateRoute } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { Fragment } from 'react';
import { Box } from '@mui/system';

import 'slick-carousel/slick/slick.css'; // Add this line
import 'slick-carousel/slick/slick-theme.css'; // Add this line
import StoreAdmin from './pages/Admin/StoreAdmin';
import AuthRequire from '~/components/AuthRequire/AuthRequire';
import { NavigateSetter } from './components/NavigateSetter/NavigateSetter';

function App() {
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
                            return <Route key={index} path={route.path} element={<Layout>{Page}</Layout>} />;
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
                                            <Layout>{Page}</Layout>
                                        </AuthRequire>
                                    }
                                />
                            );
                        })}

                        {/* React Admin */}
                        <Route path="/admin/*" element={<StoreAdmin />} />
                    </Routes>
                </Box>
            </Router>
        </Box>
    );
}

export default App;
