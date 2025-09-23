import { expect, describe, test, vi, beforeEach } from 'vitest';
import { type Todo } from '../src/Components/model';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { InputData } from '../src/Components/Input';
import { Task } from '../src/Components/task';
import React from 'react';
import { List } from '../src/Components/list';

let mockDispatch: ReturnType<typeof vi.fn>;
let input: HTMLElement;
let button: HTMLElement;
// const mockDispatchReturn =()=>{
//   return vi.fn();
// }
// List Test
describe('Todo List', () => {
  test('Renders list of tasks', () => {
    const mockDispatch = vi.fn();
    const mockTodolist: Todo[] = [];
    render(<List todolist={mockTodolist} dispatch={mockDispatch} />);
    const listElement = screen.getByTestId('list');
    expect(listElement).toBeInTheDocument(); // should work
  });
});
// InputData Tests
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

// Task tests
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
    const editButton = screen.getByTestId('edit');
    await userEvent.click(editButton);
    const inputField = screen.getByDisplayValue('Test Task');
    expect(inputField).toBeInTheDocument();
  });

  test('delete button calls dispatch', async () => {
    const deleteButton = screen.getByTestId('delete');
    await userEvent.click(deleteButton);
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('completing a task calls dispatch', async () => {
    const completeButton = screen.getByTestId('complete');
    await userEvent.click(completeButton);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
