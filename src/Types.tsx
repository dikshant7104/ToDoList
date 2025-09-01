export interface  Todo {
    id : number;
    text : string;
    date : string;
    completed : boolean;
    completionDate ?: string | null; 
}