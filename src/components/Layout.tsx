import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import LogoutButton from './LogoutButton';

interface LayoutProps {
  isLoggedIn: boolean;
  refreshToken: string | null;
  handleLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, refreshToken, handleLogout }) => {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav__link">Главная</Link>
          {isLoggedIn ? (
            <div className="nav__actions">
              <span className="nav__status">Вы в системе</span>
              <LogoutButton refreshToken={refreshToken || ''} onLogout={handleLogout} />
            </div>
          ) : (
            <div className="nav__actions">
              <Link to="/login" className="nav__link">Вход</Link>
              <Link to="/register" className="nav__link">Регистрация</Link>
            </div>
          )}
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
