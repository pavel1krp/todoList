import {FilterValueType} from "../App";
import {RequestStatusType, setErrorAC, setLoadingStatusAC} from "./app-reducer";
import {addTodoListAc, addTodoListAcType} from "./task-reducer";
import {todolistAPI, TodoListType} from "../Api/todoList-api";
import {Dispatch} from "redux";

export type TodoListsDomainType = TodoListType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

const initialState: TodoListsDomainType[] = []
export const todoListReducer = (state: TodoListsDomainType[] = initialState, action: todoListReducerActionType): TodoListsDomainType[] => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.todoListId ? {...el, filter: action.value} : el)
        case "ADD-TODO-LIST":
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]

        case "CHANGE-LIST-TITLE":
            return state.map(el => el.id === action.listID ? {...el, title: action.newTitle} : el)
        case "DELETE-LIST":
            return state.filter(el => el.id !== action.listId)
        case "SET-LIST":
            return action.todoLists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case "TODO-LIST/SET-ENTITY-STATUS":
            return state
                .map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

export type todoListReducerActionType =
    ChangeTodoListFilterACType
    | addTodoListAcType
    | changeTodoListTitleACType
    | deleteTodoListAcType
    | SetTodoListAcType
    | SetEntityAcType

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type deleteTodoListAcType = ReturnType<typeof deleteTodoListAc>
export type SetTodoListAcType = ReturnType<typeof setTodoListsAC>
type SetEntityAcType = ReturnType<typeof setEntityStatus>

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
export const setEntityStatus = (todoListId: string, entityStatus: RequestStatusType) => ({
    type: 'TODO-LIST/SET-ENTITY-STATUS',
    entityStatus,
    todoListId
}) as const

export const getTodoTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const createTodoTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.createTodoList(title)
        .then(res => {
                dispatch(setLoadingStatusAC('succeeded'))
                dispatch(addTodoListAc(res.data.data.item))
            }
        )
}
export const deleteTodoTC = (totoListId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(setEntityStatus(totoListId, 'loading'))
    todolistAPI.deleteTodoLists(totoListId)
        .then(() => {
                dispatch(setEntityStatus(totoListId, 'succeeded'))
                dispatch(setLoadingStatusAC('succeeded'))
                dispatch(deleteTodoListAc(totoListId))
            }
        ).catch((e)=>{
       dispatch(setLoadingStatusAC('failed'))
        dispatch(setEntityStatus(totoListId,'failed'))
        dispatch(setErrorAC(e.message))
    })
}
export const changeTodoListTitle = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.updateTodolist(todoListId, title)
        .then(res => {
                dispatch(setLoadingStatusAC('succeeded'))
                dispatch(changeTodoListTitleAC(todoListId, title))
            }
        )
}