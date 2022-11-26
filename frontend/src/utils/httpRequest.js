import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

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
    // transformResponse: [
    //     (data, headers, status) => {
    //         if (status === 401) {
    //             localStorage.removeItem('auth');
    //             navigate('/signin');
    //         }
    //         return JSON.parse(data);
    //     },
    // ],
});

export const get = async (url, config = {}) => {
    config.headers = { ...getHeaders(), ...config.headers };
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

export const fetch = async (url, options = {}) => {
    options.headers = { ...getHeaders(), ...options.headers };
    try {
        const response = await request.request({ url, ...options });
        return response;
    } catch (error) {
        throw error;
    }
};

export const useAxios = (url, method, config = {}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async (url, method, options = {}) => {
            try {
                const res = await request.request({ url, method, ...options });
                setData(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoaded(true);
            }
        };

        fetch();
    }, []);

    return { loaded, error, data };
};

export default request;
