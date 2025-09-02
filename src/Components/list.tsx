import React from "react";
import './styles.css'
import { type Todo } from "./model";
import { Task } from "./task";

interface Props {
  todolist: Todo[];
  dispatch: React.Dispatch<
    { type: 'add', payload: string } | 
    { type: 'delete', payload: number } |
    { type: 'completed', payload: number } |
    { type: 'edit', payload: {id:number, task:string} }
  >;
}

export const List: React.FC<Props> = ({ todolist, dispatch }) => {
  return (
    <div className="list">
      {todolist.map((todos) => (
        <Task key={todos.id} todos={todos} dispatch={dispatch} />
      ))}
    </div>
  )
}