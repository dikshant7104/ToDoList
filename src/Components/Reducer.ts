import { type Todo } from './model';

// type Actions = {
//  type : 'add',
//  payload: string
// } | {type : 'delete', payload: number} | {type : 'completed',payload: number} | {type : 'edit',payload:{id:number, task:string}}

export type ActionPayload = {
  id: number;
  task: string;
};

export type Actions = {
  type: 'add' | 'delete' | 'completed' | 'edit';
  payload: ActionPayload;
};

export const addTodoAction = (task: string): Actions => ({
  type: 'add',
  payload: { id: Date.now(), task },
});
export const deleteTodoAction = (id: number): Actions => ({
  type: 'delete',
  payload: { id, task: '' },
});

export const editTodoAction = (id: number, task: string): Actions => ({
  type: 'edit',
  payload: { id, task },
});

export const completeTodoAction = (id: number): Actions => ({
  type: 'completed',
  payload: { id, task: '' },
});

export const ToDoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), task: action.payload.task, isCompleted: false }];
    case 'delete':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'completed':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, isCompleted: true } : todo,
      );
    case 'edit':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo,
      );
    default:
      return state;
  }
};
