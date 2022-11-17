import axios from 'axios';
import { navigate } from '~/components/NavigateSetter/NavigateSetter';
import jwtDecode from 'jwt-decode';

const headers = {
    'Content-Type': 'application/json',
};

const getHeaders = () => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;

    if (token) {
        const exp = jwtDecode(token).exp * 1000;
        if (exp > Date.now()) {
            headers.Authorization = `Bearer ${token}`;
        }
    }
    return headers;
};

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: headers,
    transformResponse: [
        (data, headers, status) => {
            if (status === 401) {
                localStorage.removeItem('auth');
                navigate('/signin');
            }
            return JSON.parse(data);
        },
    ],
});

export const get = async (url, config = {}) => {
    config.headers = getHeaders();
    const response = await request.get(url, config);
    return response;
};

export const post = async (url, data, config = {}) => {
    config.headers = getHeaders();
    try {
        const response = await request.post(url, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

export const put = async (url, data, config = {}) => {
    config.headers = getHeaders();
    try {
        const response = await request.put(url, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

const _delete = async (url, config = {}) => {
    config.headers = getHeaders();
    try {
        const response = await request.delete(url, config);
        return response;
    } catch (error) {
        throw error;
    }
};

export { _delete as delete };

export const fetch = async (url, config = {}, data = {}) => {
    config.headers = getHeaders();
    try {
        const response = await request.request({ url, ...config, data });
        return response;
    } catch (error) {
        throw error;
    }
};

export default request;
