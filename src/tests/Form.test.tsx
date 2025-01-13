import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../components/Form';

describe('Form component', () => {
  it('вызывает onSubmit при отправке формы', () => {
    const mockOnSubmit = jest.fn();
    const mockHandleSubmit = jest.fn((callback) => (event) => callback(event));
    render(<Form buttonLabel="Отправить" onSubmit={mockOnSubmit} handleSubmit={mockHandleSubmit} />);

    fireEvent.submit(screen.getByRole('button', { name: /Отправить/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
