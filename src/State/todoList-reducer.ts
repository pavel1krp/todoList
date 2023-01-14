import {FilterValueType, TaskObjType, TodolistsType} from "../App";
import {v1} from "uuid";
import {addTodoListAcType} from "./task-reducer";

export const todoListReducer =(state:TodolistsType[], action:todoListReducerActionType):TodolistsType[]=>{
    switch (action.type){
        case "CHANGE-FILTER": return state.map(el => el.id === action.todoListId ? {...el, filter: action.value} : el)
        case "ADD-TODO-LIST":return [{id: action.listId, title: action.title, filter: 'all'},...state]
        default:return state
    }
}
export type todoListReducerActionType =  ChangeTodoListFilterAC|addTodoListAcType
type ChangeTodoListFilterAC = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todoListId: string, value: FilterValueType) =>{return {type:"CHANGE-FILTER", todoListId, value }as const}

