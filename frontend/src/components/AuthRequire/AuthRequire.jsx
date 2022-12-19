import { Navigate, useLocation } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { route } from '~/config';

const AuthRequire = ({ children, ...rest }) => {
    const location = useLocation();

    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;
    if (token) {
        const exp = jwt_decode(token).exp * 1000;
        if (exp > Date.now()) return children;
    }

    localStorage.removeItem('auth');
    return <Navigate to={route.signin.path} state={location.pathname} />;
};

export default AuthRequire;
