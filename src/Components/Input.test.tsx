import { InputData } from './Input';
import { expect, describe, test, vi, beforeEach } from 'vitest';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import React from 'react';

let mockDispatch: ReturnType<typeof vi.fn>;
let input: HTMLElement;
let button: HTMLElement;
describe('InputData component', () => {
  beforeEach(() => {
    mockDispatch = vi.fn();
    render(<InputData dispatch={mockDispatch} />);
    input = screen.getByPlaceholderText(/enter your task/i); // Used Regex Expression for case insensitive match
    button = screen.getByRole('button');
  });

  test('renders input and button', () => {
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('calls dispatch and clears input on submit', async () => {
    await userEvent.type(input, 'Test Task');
    await userEvent.click(button);
    expect(mockDispatch).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBe('');
  });

  test('does not dispatch if input is empty', async () => {
    await userEvent.click(button);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
