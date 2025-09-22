import { describe, test, vi } from 'vitest';
import { type Todo } from '../src/Components/model';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { InputData } from '../src/Components/Input';
import { List } from '../src/Components/list';
// import React from 'react';
// import '@testing-library/jest-dom';

describe('Input Data', () => {
  test('updates value, dispatches action on submit, and clears input', () => {
    // const mockDispatch = vi.fn();
    // const user = userEvent.setup();
    // render(<InputData/>);
  });
});

describe('Todo List', () => {
  const mockDispatch = vi.fn();
  const mockTodolist: Todo[] = [];
  render(<List todolist={mockTodolist} dispatch={mockDispatch} />);
  test('Renders list of tasks', () => {
    // const listElement = screen.getByTestId('list');
    // expect(listElement).toBeInTheDocument();
  });
});
