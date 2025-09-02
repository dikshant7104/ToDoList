import { type Todo } from "./model";

type Actions = {
 type : 'add',
 payload: string
} | {type : 'delete', payload: number} | {type : 'completed',payload: number} | {type : 'edit',payload:{id:number, task:string}}


export const ToDoReducer = (state:Todo[],action : Actions) =>{
    switch(action.type){
        case 'add':
            return [...state,{id:Date.now(),task:action.payload,isCompleted:false}]
        case 'delete':
            return state.filter(todo => todo.id !== action.payload)
        case 'completed':
            return state.map(todo => todo.id === action.payload ? {...todo,isCompleted:!todo.isCompleted} : todo)
        case 'edit':
            return state.map((todo) => todo.id === action.payload.id ? {...todo, task: action.payload.task} : todo)
        default:
            return state
    }

}
