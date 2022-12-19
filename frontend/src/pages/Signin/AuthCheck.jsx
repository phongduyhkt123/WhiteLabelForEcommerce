import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { route } from '~/config';

const AuthCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;
        if (token) {
            const exp = jwt_decode(token).exp * 1000;
            if (exp > Date.now()) {
                navigate(route.home.path);
            }
        }
    }, []);
};

export default AuthCheck;
