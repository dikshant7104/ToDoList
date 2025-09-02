import { useState, useReducer } from 'react'
import './Index.css'
import { InputData } from './Components/Input'
import {type Todo } from './Components/model'
import { List } from './Components/list'
import { ToDoReducer } from './Components/Reducer'
const App: React.FC  = () => {
  const [todos, setTodos] = useState<string>('')
  // console.log(todos)
  // const [todolist, setTodolist] = useState<Todo[]>([])
  const [todolist, dispatch] = useReducer(ToDoReducer, [] as Todo[])


  const addTodos = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  if (todos){
    // setTodolist([...todolist, {id: Date.now(), task: todos, isCompleted: false}])
    dispatch({type: 'add', payload: todos})
    setTodos('');
  }
  }
// console.log(todolist);
  return (
    <>
      <div className='App'>
        <span className="heading">To-Do List </span>
        <InputData todos={todos} setTodos={setTodos} addTodos={addTodos} />
        {/* <List todolist={todolist} setTodolist={setTodolist} /> */}
        <List todolist={todolist} dispatch={dispatch} />
        </div>
    </>
  )
}

export default App

