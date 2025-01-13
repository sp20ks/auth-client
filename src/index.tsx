import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

const initializeCsrfToken = async () => {
    if (process.env.REACT_APP_USE_CSRF === 'true') {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/csrf-token`, { withCredentials: true });
            console.log('CSRF токен успешно получен');
        } catch (error) {
            console.error('Ошибка получения CSRF токена', error);
        }
    }
};

const startApp = async () => {
    await initializeCsrfToken();
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

startApp();
