import React,{useRef} from "react";
import './styles.css'
import { Button } from 'reactstrap';
import { CgSandClock } from "react-icons/cg";

interface Props{
    todos: string;
    setTodos: React.Dispatch<React.SetStateAction<string>>;
    addTodos: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const InputData = ({todos,setTodos, addTodos}: Props) =>{

    const inputRef = useRef<HTMLInputElement>(null)
    return <>
        <div>
            <form action="" className="input" onSubmit={(e)=>{
                inputRef.current?.blur();
                addTodos(e)}}> 
                <input ref={inputRef}
                 type="input" placeholder="Enter your task" className="input_field"
                value={todos} onChange={(e)=>setTodos(e.target.value)} />
            <Button type="submit" className="sub_button" color="primary"><CgSandClock /></Button>
            </form>

        </div>
    </>
}