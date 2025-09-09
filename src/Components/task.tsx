import React, { useEffect, useState } from 'react';
import { type Todo } from "./model";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import './styles.css';
import { Button } from 'reactstrap'; 
import { deleteTodoAction, editTodoAction ,completeTodoAction } from './list';
import type { Actions } from './Reducer';

interface Props {
  todos: Todo;
 dispatch : (action: Actions) => void;
}

export const Task: React.FC<Props> = ({ todos, dispatch }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editedTask, setEditedTask] = useState<string>(todos.task)
  // const editRef = useRef<HTMLInputElement>(null);

  // Focus input when entering edit mode without useRef.
  useEffect(() => {
    if (edit) {
      document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
    }
  }, [edit]);
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editTodoAction(todos.id, editedTask))
    setEdit(false);
  }

  return (
    <form className='task-form' onSubmit={handleEdit}>
      {
        edit ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        ) : (
          todos.isCompleted ? <s>{todos.task}</s> : <span className='task-text'>{todos.task}</span>
        )
      }

      <div>
        <Button className='icon' color='warning' disabled={todos.isCompleted} onClick={() => { if(!edit && !todos.isCompleted){ setEdit(true) }}}><TbEdit/></Button>
        <Button className='icon' color='warning' onClick={() => dispatch(deleteTodoAction(todos.id))}><RiDeleteBinFill /></Button>
        <Button className='icon' color='warning' onClick={() => dispatch(completeTodoAction(todos.id))}><MdOutlineDownloadDone /></Button>
      </div>
    </form>
  )
}