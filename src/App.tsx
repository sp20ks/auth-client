import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const handleLogin = (token: string) => {
        setIsLoggedIn(true);
        setRefreshToken(token);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRefreshToken(null);
    };

    return (
        <Router>
            <header>
                <nav>
                    <Link to="/">Главная</Link>
                    {isLoggedIn ? (
                        <>
                            <span>Вы в системе</span>
                            <LogoutButton refreshToken={refreshToken || ''} onLogout={handleLogout} />
                        </>
                    ) : (
                        <>
                            <Link to="/login">Вход</Link>
                            <Link to="/register">Регистрация</Link>
                        </>
                    )}
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<div>Добро пожаловать!</div>} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
