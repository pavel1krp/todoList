import {TaskObjType} from "../App";

export const taskReducer =(state:TaskObjType, action:taskReducerActionType)=>{
    switch (action.type){
        case "DELETE-TASK": return {...state, [action.ListId]: state[action.ListId].filter(el => el.id !== action.taskId)}
        default:return state
    }
}
export type taskReducerActionType = deleteTaskACType

type deleteTaskACType =ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (ListId: string, taskId: string)=> {return{type:"DELETE-TASK", ListId,taskId} as const}