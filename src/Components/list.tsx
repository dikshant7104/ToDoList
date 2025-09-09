import React from "react";
import './styles.css'
import { type Todo } from "./model";
import { Task } from "./task";
import type { Actions } from "./Reducer";

interface ListProps {
  todolist: Todo[];
  dispatch : (action: Actions) => void;
}
  export const addTodoAction = (task:string):Actions =>({
    type : 'add',
    payload: {id: Date.now(), task}
  });
  export const deleteTodoAction = (id: number): Actions => ({
  type: 'delete',
  payload: { id, task:'' },
});

export const editTodoAction = (id: number, task: string): Actions => ({
  type: 'edit',
  payload: { id, task },
});

export const completeTodoAction = (id: number): Actions => ({
  type: 'completed',
  payload: { id, task:'' },
});

export const List: React.FC<ListProps> = ({ todolist, dispatch }) => {
  return (
    <div className="list">
      {todolist.map((t) => (
        <Task key={t.id} todos={t} dispatch={dispatch} />
      ))}
    </div>
  )
}