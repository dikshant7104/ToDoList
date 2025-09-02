import React, { useEffect, useRef, useState } from 'react';
import { type Todo } from "./model";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import './styles.css';
import { Button } from 'reactstrap'; 

interface Props {
  todos: Todo;
  dispatch: React.Dispatch<
    { type: 'delete', payload: number } |
    { type: 'completed', payload: number } |
    { type: 'edit', payload: {id:number, task:string} }
  >;
}

export const Task: React.FC<Props> = ({ todos, dispatch }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editedTask, setEditedTask] = useState<string>(todos.task)
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'edit', payload: { id: todos.id, task: editedTask } })
    setEdit(false);
  }

  return (
    <form className='task-form' onSubmit={handleEdit}>
      {
        edit ? (
          <input
            type="text"
            ref={editRef}
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        ) : (
          todos.isCompleted ? <s>{todos.task}</s> : <span className='task-text'>{todos.task}</span>
        )
      }

      <div>
        <Button className='icon' color='warning' disabled={todos.isCompleted} onClick={() => { if(!edit && !todos.isCompleted){ setEdit(true) }}}><TbEdit/></Button>
        <Button className='icon' color='warning' onClick={() => dispatch({ type: 'delete', payload: todos.id })}><RiDeleteBinFill /></Button>
        <Button className='icon' color='warning' onClick={() => dispatch({ type: 'completed', payload: todos.id })}><MdOutlineDownloadDone /></Button>
      </div>
    </form>
  )
}