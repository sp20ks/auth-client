import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import Home from './components/Home';

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
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout isLoggedIn={isLoggedIn} refreshToken={refreshToken} handleLogout={handleLogout} />}>
              <Route index element={<Home />} />
              <Route path='/register' element={<RegisterForm />} />
              <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
            </Route>
          </Routes>
        </BrowserRouter>
    );
};

export default App;
