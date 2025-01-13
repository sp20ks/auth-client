import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';

describe('Layout component', () => {
  it('рендерит навигацию для авторизованных пользователей', () => {
    render(
      <MemoryRouter>
        <Layout isLoggedIn={true} refreshToken="dummy-token" handleLogout={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Вы в системе/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Выйти/i })).toBeInTheDocument();
  });

  it('рендерит навигацию для неавторизованных пользователей', () => {
    render(
      <MemoryRouter>
        <Layout isLoggedIn={false} refreshToken={null} handleLogout={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
  });
});
