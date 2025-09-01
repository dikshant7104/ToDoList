import React, { useEffect, useRef, useState } from 'react';
import { type Todo } from "./model";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import './styles.css';
interface Props {
    todos : Todo;
    todolist: Todo[];
        setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const Task: React.FC<Props> = ({todos, todolist, setTodolist}) =>{

    const [edit,setEdit] = useState<boolean>(false)
    const [editedTask,setEditedTask] = useState<string>(todos.task)

    const editRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        
            editRef.current?.focus();
        
    }, [edit]); 

    const isCompleted = (id: number) =>{
        setTodolist(todolist.map((todos)=>todos.id === id ? {...todos, isCompleted: !todos.isCompleted} : todos))
    }

    const handleDelete = (id: number) =>{
        setTodolist(todolist.filter((todos)=> todos.id !== id))
    }

    const handleEdit = (e: React.FormEvent,id: number)=>{
       e.preventDefault();
    setTodolist(todolist.map((todos)=> todos.id === id ? {...todos, task: editedTask} : todos))
    setEdit(false);
}
return (
    <>
<form className='task-form' onSubmit={(e)=>handleEdit(e,todos.id)}>

{
    edit ? (
        <input type="text" ref={editRef} value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
    ) : (
        todos.isCompleted?(<s>{todos.task}</s>):(<span className='task-text'>{todos.task}</span>)
    )
}

<div>
    <span className='icon' onClick={()=> {if(!edit && !todos.isCompleted){setEdit(!edit)}}}><TbEdit/></span>
    <span className='icon' onClick={()=>handleDelete(todos.id)}><RiDeleteBinFill /></span>
    <span className='icon' onClick={()=>isCompleted(todos.id)}><MdOutlineDownloadDone /></span>
</div>
</form>
    </>
)
}