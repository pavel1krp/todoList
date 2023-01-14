import {TaskObjType} from "../App";
import {v1} from "uuid";

export const taskReducer =(state:TaskObjType, action:taskReducerActionType)=>{
    switch (action.type){
        case "DELETE-TASK": return {...state, [action.ListId]: state[action.ListId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK': return {...state, [action.listId]: [...state[action.listId], {id: v1(), title: action.title, isDone: false}]}
        default:return state
    }
}
export type taskReducerActionType = deleteTaskACType|addTaskACType

type deleteTaskACType =ReturnType<typeof deleteTaskAC>
type addTaskACType =ReturnType<typeof addTaskAC>
export const deleteTaskAC = (ListId: string, taskId: string)=> {return{type:"DELETE-TASK", ListId,taskId} as const}
export const addTaskAC =(listId:string, title:string)=>{return{type:"ADD-TASK",listId,title}as const }