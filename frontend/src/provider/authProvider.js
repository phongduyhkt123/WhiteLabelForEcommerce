import * as request from '~/utils/httpRequest';
import { route } from '~/config';
import jwt_decode from 'jwt-decode';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const authProvider = {
    login: ({ username: loginKey, password }) => {
        const login = async () => {
            try {
                const response = await request.post(route.signinAdminAPI.url, { loginKey, password });
                const { token, type, userInfo } = response.data;
                if (userInfo.role.toLowerCase() !== 'admin') {
                    throw new Error('You are not admin');
                } else {
                    localStorage.setItem('auth', JSON.stringify({ token, type, userInfo }));
                    return { redirectTo: '/admin' };
                }
            } catch (error) {
                throw new Error(error.data?.message || JSON.stringify(error.data));
            }
        };

        return login();
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    // call whenever
    checkAuth: () => {
        const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        if (auth) {
            const exp = jwt_decode(auth.token).exp * 1000;
            if (auth.userInfo.role.toLowerCase() !== 'admin') {
                return Promise.reject('You are not admin');
            }
            if (exp > Date.now()) return Promise.resolve();
        }
        localStorage.removeItem('auth');
        return Promise.reject();
    },
    // If both authProvider.checkAuth() and authProvider.logout() return a redirect URL, the one from authProvider.checkAuth() takes precedence.
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            const { id, fullname: fullName, avatar } = JSON.parse(localStorage.getItem('auth')).userInfo;
            return Promise.resolve({ id, fullName, avatar });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPermissions: () => Promise.resolve({ redirectTo: '/admin' }),
};
