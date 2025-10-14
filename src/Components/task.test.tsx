import { expect, describe, test, vi, beforeEach } from 'vitest';
import { type Todo } from './model';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Task } from './task';

let mockDispatch: ReturnType<typeof vi.fn>;
describe('Task component', () => {
  const mockTodo: Todo = { id: 1, task: 'Test Task', isCompleted: false };
  beforeEach(() => {
    mockDispatch = vi.fn();
    render(<Task todos={mockTodo} dispatch={mockDispatch} />);
  });

  test('renders task text', () => {
    const taskText = screen.getByText('Test Task');
    expect(taskText).toBeInTheDocument();
  });

  test('edit button enables edit mode', async () => {
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    const inputField = screen.getByDisplayValue('Test Task');
    expect(inputField).toBeInTheDocument();
  });

  test('delete button calls dispatch', async () => {
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('completing a task calls dispatch', async () => {
    const completeButton = screen.getByRole('button', { name: /complete/i });
    await userEvent.click(completeButton);
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('Handle edit form submission', async () => {
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    const inputField = screen.getByDisplayValue('Test Task');
    await userEvent.clear(inputField);
    await userEvent.type(inputField, 'Updated Task');
    await userEvent.keyboard('{Enter}');
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('renders completed todo with strikethrough', () => {
    const completedTodo = { id: 1, task: 'Completed Task', isCompleted: true };
    const { getByText } = render(<Task todos={completedTodo} dispatch={mockDispatch} />);
    const strikethrough = getByText('Completed Task');
    expect(strikethrough.tagName).toBe('S');
  });
});
