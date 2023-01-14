import {FilterValueType, TodolistsType} from "../App";
import {addTodoListAcType} from "./task-reducer";

const initialState:TodolistsType[] = []
export const todoListReducer =(state:TodolistsType[] = initialState, action:todoListReducerActionType):TodolistsType[]=>{
    switch (action.type){
        case "CHANGE-FILTER": return state.map(el => el.id === action.todoListId ? {...el, filter: action.value} : el)
        case "ADD-TODO-LIST":return [{id: action.listId, title: action.title, filter: 'all'},...state]
        case "CHANGE-LIST-TITLE": return state.map(el=>el.id ===action.listID?{...el, title:action.newTitle} :el)
        case "DELETE-LIST": return state.filter(el=> el.id!==action.listId)
        default:return state
    }
}
export type todoListReducerActionType =  ChangeTodoListFilterACType|addTodoListAcType|changeTodoListTitleACType|deleteTodoListAcType
type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type deleteTodoListAcType = ReturnType<typeof deleteTodoListAc>
export const changeTodoListFilterAC = (todoListId: string, value: FilterValueType) =>{return {type:"CHANGE-FILTER", todoListId, value }as const}
export const changeTodoListTitleAC =(listID:string, newTitle:string)=>{return{type:"CHANGE-LIST-TITLE", listID, newTitle}as const}
export const deleteTodoListAc=(listId:string)=>{return{type:"DELETE-LIST", listId}as const}

