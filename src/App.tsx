import { useReducer } from 'react';
import './index.css';
import { InputData } from './Components/Input';
import { type Todo } from './Components/model';
import { List } from './Components/list';
import { ToDoReducer } from './Components/Reducer';
const App: React.FC = () => {
  const todoInitialState: Todo[] = [];
  const [todolist, dispatch] = useReducer(ToDoReducer, todoInitialState);
  return (
    <>
      <div className="App">
        <span className="heading">To-Do List </span>
        <InputData dispatch={dispatch} />
        <List todolist={todolist} dispatch={dispatch} />
      </div>
    </>
  );
};

export default App;
