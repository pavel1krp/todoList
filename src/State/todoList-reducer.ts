import {FilterValueType, TodolistsType} from "../App";
import {addTodoListAcType} from "./task-reducer";
import {todolistAPI, TodoListType} from "../Api/todoList-api";
import {Dispatch} from "redux";

type TodolistsDomainType = TodoListType & {
    filter: FilterValueType
}

const initialState: TodolistsDomainType[] = []
export const todoListReducer = (state: TodolistsDomainType[] = initialState, action: todoListReducerActionType): TodolistsType[] => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.todoListId ? {...el, filter: action.value} : el)
        case "ADD-TODO-LIST":
            return [{id: action.listId, title: action.title, filter: 'all'}, ...state]
        case "CHANGE-LIST-TITLE":
            return state.map(el => el.id === action.listID ? {...el, title: action.newTitle} : el)
        case "DELETE-LIST":
            return state.filter(el => el.id !== action.listId)
        case "SET-LIST":
            return action.todoLists.map(el => ({...el, filter: 'all'}))
        default:
            return state
    }
}

export type todoListReducerActionType =
    ChangeTodoListFilterACType
    | addTodoListAcType
    | changeTodoListTitleACType
    | deleteTodoListAcType
    | setTodoListAcType

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type deleteTodoListAcType = ReturnType<typeof deleteTodoListAc>
export type setTodoListAcType = ReturnType<typeof setTodoListsAC>

export const changeTodoListFilterAC = (todoListId: string, value: FilterValueType) => ({
    type: "CHANGE-FILTER",
    todoListId,
    value
}) as const
export const changeTodoListTitleAC = (listID: string, newTitle: string) => ({
    type: "CHANGE-LIST-TITLE",
    listID,
    newTitle
}) as const
export const deleteTodoListAc = (listId: string) => ({type: "DELETE-LIST", listId}) as const
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-LIST', todoLists}) as const

export const getTodoTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}

