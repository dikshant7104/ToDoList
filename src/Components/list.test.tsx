import { expect, describe, test, vi } from 'vitest';
import { type Todo } from './model';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { List } from './list';

describe('Todo List', () => {
  test('Renders list of tasks', () => {
    const mockDispatch = vi.fn();
    const mockTodolist: Todo[] = [];
    render(<List todolist={mockTodolist} dispatch={mockDispatch} />);
    const listElement = screen.getByTestId('list');
    expect(listElement).toBeInTheDocument(); // should work
  });
});
