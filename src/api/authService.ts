import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const registerUser = (data: { username: string; password: string; email: string }) => {
    return axios.post(`${API_BASE_URL}/register`, data);
};

export const loginUser = (data: { username: string; password: string }) => {
    return axios.post(`${API_BASE_URL}/login`, data);
};

export const logoutUser = (refreshToken: string) => {
    return axios.post(`${API_BASE_URL}/logout`, { refresh_token: refreshToken });
};
