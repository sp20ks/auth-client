import React from 'react';
import { logoutUser } from '../api/authService';
import { translateError } from '../errorTranslator';

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
            const readableError = translateError(err);
            alert(readableError);
        }
    };

    return <button onClick={handleLogout}>Выйти</button>;
};

export default LogoutButton;
