import React from 'react';
import './styles.css';
import { type Todo } from './model';
import { Task } from './task';
import type { Actions } from './Reducer';

interface ListProps {
  todolist: Todo[];
  dispatch: (action: Actions) => void;
}

export const List: React.FC<ListProps> = ({ todolist, dispatch }) => {
  return (
    <div className="list">
      {todolist.map((t) => (
        <Task key={t.id} todos={t} dispatch={dispatch} />
      ))}
    </div>
  );
};
