import React from "react";
import './styles.css'
import { type Todo } from "./model";
import { Task } from "./task";

interface Props{
    todolist: Todo[];
    setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const List: React.FC<Props> = ({todolist,setTodolist}) => {
    return (
        <><div className="list">

{todolist.map((todos)=>(<Task key={todos.id} todos={todos} todolist={todolist} setTodolist={setTodolist} />))}
        </div>

        </>
    )
}