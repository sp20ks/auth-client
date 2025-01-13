import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

describe('LoginForm component', () => {
  it('рендерит форму логина', () => {
    render(<LoginForm onLogin={() => {}} />);
    expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
  });

  it('отправляет данные формы', () => {
    const mockOnLogin = jest.fn();
    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByLabelText(/Имя/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));
  });
});
