import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

describe('Home component', () => {
  it('рендерит главную страницу с заголовком', () => {
    render(<Home />);
    expect(screen.getByText(/Главная страница/i)).toBeInTheDocument();
  });
});
