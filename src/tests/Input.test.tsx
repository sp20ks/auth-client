import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input';

describe('Input component', () => {
  it('вызывает register при изменении значения', () => {
    const mockRegister = jest.fn();
    render(<Input name="test" register={mockRegister} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(mockRegister).toHaveBeenCalled();
  });
});
