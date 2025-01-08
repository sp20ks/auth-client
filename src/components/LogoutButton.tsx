import React from 'react';
import { logoutUser } from '../api/authService';

interface LogoutButtonProps {
    refreshToken: string;
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ refreshToken, onLogout }) => {
    const handleLogout = async () => {
        try {
            await logoutUser(refreshToken);
            alert('Вы успешно вышли из системы!');
            onLogout();
        } catch (err) {
            alert('Ошибка выхода');
        }
    };

    return <button onClick={handleLogout}>Выйти</button>;
};

export default LogoutButton;
