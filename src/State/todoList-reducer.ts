import {FilterValueType, TaskObjType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todoListReducer =(state:TodolistsType[], action:todoListReducerActionType)=>{
    switch (action.type){
        case "CHANGE-FILTER": return state.map(el => el.id === action.todoListId ? {...el, filter: action.value} : el)
        default:return state
    }
}
export type todoListReducerActionType =  ChangeTodoListFilterAC
type ChangeTodoListFilterAC = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todoListId: string, value: FilterValueType) =>{return {type:"CHANGE-FILTER", todoListId, value }as const}

