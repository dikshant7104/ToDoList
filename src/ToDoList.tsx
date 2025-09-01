import React from "react";
import { useState, useEffect, useReducer } from "react";
import { type Todo } from "./Types";
export const ToDoList = () =>{
 const [id,setId] = useState<number | null>(null);
 const [todos, setTodos] = useState<Todo[]>([]);
 const [text, setText] = useState<string>("");
 const [date, setDate] = useState<string>("");
    return <>
    <div className="main-container">
        <h1>ToDoList</h1>
        <ul>
<li>
    item 1
</li>
<li>
    item 2
</li>
        </ul>
        <input type="text" name="" id="" placeholder="Add a new task" />
        
        <button>Add Task</button>
        </div>
    </>
}