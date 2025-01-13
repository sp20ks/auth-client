import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

if (process.env.REACT_APP_USE_CSRF === 'true') {
    api.interceptors.request.use((config) => {
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
}

export const registerUser = (data: { username: string; password: string; email: string }) => {
    return api.post('/register', data);
};

export const loginUser = (data: { username: string; password: string }) => {
    return api.post('/login', data);
};

export const logoutUser = (refreshToken: string) => {
    return api.post('/logout', { refresh_token: refreshToken });
};
