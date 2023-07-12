import { Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const AnimationRoutes = ({ children }) => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {children}
            </Routes>
        </AnimatePresence>
    );
};

export default AnimationRoutes;
