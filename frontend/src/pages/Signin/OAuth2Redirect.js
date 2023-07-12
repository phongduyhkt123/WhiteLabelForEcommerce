import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Redirect = () => {
    // get token from url
    const token = new URLSearchParams(window.location.search).get('token');
    const userInfo = new URLSearchParams(window.location.search).get('user');

    localStorage.setItem(
        'auth',
        JSON.stringify({ token, type: 'Bearer', userInfo: JSON.parse(decodeURIComponent(userInfo)) }),
    );

    const navigate = useNavigate();

    useEffect(() => {
        console.log('11111');

        const { token, userInfo } = JSON.parse(localStorage.getItem('auth'));

        if (token) {
            console.log('22222');
            if (userInfo.role === 'ROLE_ADMIN') {
                navigate('/');
            } else {
                navigate('/');
            }
        }
    }, [localStorage.getItem('auth')]);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
};

export default OAuth2Redirect;
