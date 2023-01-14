import {TaskObjType} from "../App";
import {v1} from "uuid";

export const taskReducer =(state:TaskObjType, action:taskReducerActionType):TaskObjType=>{
    switch (action.type){
        case "DELETE-TASK": return {...state, [action.ListId]: state[action.ListId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK': return {...state, [action.listId]: [...state[action.listId], {id: v1(), title: action.title, isDone: false}]}
        case 'CHANGE-IS-DONE': return {...state,[action.todoListId]:state[action.todoListId].map(el=>el.id === action.taskId?{...el, isDone:action.done} :el)  }
        case 'ADD-TODO-LIST': return {...state, [action.listId]:[]}
        default:return state
    }
}
export type taskReducerActionType = deleteTaskACType|addTaskACType|changeIdDoneACType|addTodoListAcType

type deleteTaskACType =ReturnType<typeof deleteTaskAC>
type addTaskACType =ReturnType<typeof addTaskAC>
type  changeIdDoneACType=ReturnType<typeof changeIdDoneAC>
export type  addTodoListAcType=ReturnType<typeof addTodoListAc>
export const deleteTaskAC = (ListId: string, taskId: string)=> {return{type:"DELETE-TASK", ListId,taskId} as const}
export const addTaskAC =(listId:string, title:string)=>{return{type:"ADD-TASK",listId,title}as const }
export const changeIdDoneAC =(todoListId: string, taskId: string, done: boolean)=>{return{type:"CHANGE-IS-DONE",todoListId,taskId,done}as const }
export const addTodoListAc =(title:string)=>{return{type:"ADD-TODO-LIST",title, listId:v1()}as const }
