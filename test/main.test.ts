import { expect, describe, test } from 'vitest';
import { ToDoReducer } from '../src/Components/Reducer';
import { type Todo } from '../src/Components/model';
import { type Actions } from '../src/Components/Reducer';
describe('ToDoReducer', () => {
  const initialState: Todo[] = [
    { id: 1, task: 'Add Todo', isCompleted: false },
    { id: 2, task: 'Delete Todo', isCompleted: true },
    { id: 3, task: 'Edit Todo', isCompleted: false },
  ];

  test('Should add a new ToDo', () => {
    const newTodo = { id: 4, task: 'New ToDo', isCompleted: false };
    const action = { type: 'add', payload: newTodo } as Actions;
    const newState = ToDoReducer(initialState, action);
    const addedTodo = newState.find((todo) => todo.task === 'New ToDo');
    expect(newState.length).toBe(4); //Assertion to check if new ToDo is Added or not
    expect(addedTodo).toBeDefined(); //To check if the newly added ToDo is Added or not
    expect(addedTodo?.isCompleted).toBe(false); //To check if the newly added ToDo is not completed
  });

  test('Should delete a ToDo', () => {
    const action = { type: 'delete', payload: { id: 2, task: 'Delete ToDo' } } as Actions;
    const newState = ToDoReducer(initialState, action);
    const deleteToDo = newState.find((t) => t.id === 2);
    expect(newState.length).toBe(2); //Assertion to check if ToDo is Deleted or not
    expect(deleteToDo).toBeUndefined(); //To check if the deleted ToDo is Deleted or not
  });

  test('Should edit a ToDo', () => {
    const action = { type: 'edit', payload: { id: 3, task: 'Edit ToDo' } } as Actions;
    const newState = ToDoReducer(initialState, action);
    const beforeLength = initialState.length;
    const editToDo = newState.find((t) => t.id === 3);
    const afterlength = newState.length;
    expect(beforeLength).toBe(afterlength); //To check if the length of ToDo is same or not after editing
    expect(editToDo).toBeDefined(); //To check if the edited ToDo is Edited or not
    expect(editToDo?.task).toBe('Edit ToDo'); //To check if the edited ToDo task is Edited or not
  });

  test('Should complete a ToDo', () => {
    const action = { type: 'completed', payload: { id: 1 } } as Actions;
    const newState = ToDoReducer(initialState, action);
    const completeToDo = newState.find((t) => t.id === 1);
    expect(completeToDo).toBeDefined(); //To check if the completed ToDo is Completed or not
    expect(completeToDo?.isCompleted).toBe(true); //To check if the completed ToDo is marked as Completed or not
  });
});
