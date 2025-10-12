import { expect, describe, test, vi } from 'vitest';
import { type Todo } from './model';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './list';
describe('Todo List', () => {
  test('Renders list of tasks', () => {
    const mockDispatch = vi.fn();
    const mockTodolist: Todo[] = [];

    const { getByTestId } = render(<List todolist={mockTodolist} dispatch={mockDispatch} />);

    const listElement = getByTestId('list');

    expect(listElement).toBeInTheDocument(); // should work
  });

  test('Renders 5 tasks', () => {
    const mockDispatch = vi.fn();
    const mockTodolist: Todo[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      task: `Task ${i + 1}`,
      isCompleted: false,
    }));

    const { getByText } = render(<List todolist={mockTodolist} dispatch={mockDispatch} />);

    mockTodolist.forEach((todo) => {
      expect(getByText(todo.task)).toBeInTheDocument();
    });
  });
});
