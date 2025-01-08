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
    <div>
      <header>
        <nav>
          <Link to='/'>Главная</Link>
          {isLoggedIn ? (
            <>
              <span>Вы в системе</span>
              <LogoutButton refreshToken={refreshToken || ''} onLogout={handleLogout} />
            </>
          ) : (
            <>
              <Link to='/login'>Вход</Link>
              <Link to='/register'>Регистрация</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
