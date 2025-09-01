import { type Todo } from "./Types";

const KEY = 'todoList';

export const loadTodos = () : Todo[] => {
    try{
        const data = localStorage.getItem(KEY);
        if(!data) return []
        return JSON.parse(data) as Todo[];

    }catch{
        return []
    }
};

export const saveTodos = (todos: Todo[]) =>{
    try {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }catch{
    
    }
};
