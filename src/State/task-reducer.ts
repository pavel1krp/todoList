import {TaskObjType} from "../App";
import {v1} from "uuid";

const initialState:TaskObjType = {}

export const taskReducer =(state:TaskObjType = initialState, action:taskReducerActionType):TaskObjType=>{
    switch (action.type){
        case "DELETE-TASK": return {...state, [action.ListId]: state[action.ListId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK': return {...state, [action.listId]: [...state[action.listId], {id: v1(), title: action.title, isDone: false}]}
        case 'CHANGE-IS-DONE': return {...state,[action.todoListId]:state[action.todoListId].map(el=>el.id === action.taskId?{...el, isDone:action.done} :el)  }
        case 'ADD-TODO-LIST': return {...state, [action.listId]:[]}
        case "CHANGE-TITLE": return {...state, [action.listId]: state[action.listId].map(el=>el.id ===action.taskId? {...el, title:action.title}:el)}
        default:return state
    }
}
export type taskReducerActionType = deleteTaskACType|addTaskACType|changeIdDoneACType|addTodoListAcType|changeTaskTitleACType

type deleteTaskACType =ReturnType<typeof deleteTaskAC>

type addTaskACType =ReturnType<typeof addTaskAC>

type  changeIdDoneACType=ReturnType<typeof changeIdDoneAC>

export type  addTodoListAcType=ReturnType<typeof addTodoListAc>

export type  changeTaskTitleACType=ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC =(listId:string, taskId:string,title:string)=>{return{type:'CHANGE-TITLE',listId,taskId,title} as const}

export const deleteTaskAC = (ListId: string, taskId: string)=> {return{type:"DELETE-TASK", ListId,taskId} as const}

export const addTaskAC =(listId:string, title:string)=>{return{type:"ADD-TASK",listId,title}as const }

export const changeIdDoneAC =(todoListId: string, taskId: string, done: boolean)=>{return{type:"CHANGE-IS-DONE",todoListId,taskId,done}as const }

export const addTodoListAc =(title:string)=>{return{type:"ADD-TODO-LIST",title, listId:v1()}as const }
