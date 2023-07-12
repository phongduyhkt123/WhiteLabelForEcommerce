import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

export const BASE_URL = 'http://localhost:8080/api/';

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
    baseURL: BASE_URL, //process.env.REACT_APP_BASE_URL,
    timeout: 20000,
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
    config.headers = { ...getHeaders(), ...config.headers };
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

export const patch = async (url, data, config = {}) => {
    config.headers = getHeaders();
    try {
        const response = await request.patch(url, data, config);
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
        console.log('options', options);
        const response = await request.request({ url, ...options });
        return response;
    } catch (error) {
        throw error;
    }
};

export const useAxios = ({ url, method = 'GET', config = {}, dep = [], isAuthen = false }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    if (isAuthen) {
        config.headers = getHeaders();
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoaded(false);
                const res = await request.request({ url, method, ...config });
                setData(res.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoaded(true);
            }
        };
        fetch();
    }, dep);

    return { loaded, error, data, setData };
};

export default request;
