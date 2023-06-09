import {TaskObjType} from "../App";
import {v1} from "uuid";
import {setTodoListAcType} from "./todoList-reducer";
import {Dispatch} from "redux";
import {TasksType, todolistAPI} from "../Api/todoList-api";

const initialState: TaskObjType = {}

export const taskReducer = (state: TaskObjType = initialState, action: taskReducerActionType): TaskObjType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {...state, [action.ListId]: state[action.ListId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                // ...state,
                // [action.listId]: [...state[action.listId], {id: v1(), title: action.title, isDone: false}]
            }
        case 'CHANGE-IS-DONE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.done
                } : el)
            }
        case 'ADD-TODO-LIST':
            return {...state, [action.listId]: []}
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.listId]: state[action.listId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case 'SET-LIST':
            const copyState = {...state}
            action.todoLists.forEach((el) => {
                copyState[el.id] = []
            })
            return copyState
        case "SET-TASKS": {
            return {
                ...state,
                [action.todoListId]: action.tasks
            }
        }

        default:
            return state
    }
}
export type taskReducerActionType = deleteTaskACType |
    addTaskACType |
    changeIdDoneACType |
    addTodoListAcType |
    changeTaskTitleACType |
    setTodoListAcType |
    setTAsksACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type  changeIdDoneACType = ReturnType<typeof changeIdDoneAC>
export type  addTodoListAcType = ReturnType<typeof addTodoListAc>
export type  changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type setTAsksACType = ReturnType<typeof setTAsksAC>

export const changeTaskTitleAC = (listId: string, taskId: string, title: string) => ({
    type: 'CHANGE-TITLE',
    listId,
    taskId,
    title
}) as const
export const deleteTaskAC = (ListId: string, taskId: string) => ({type: "DELETE-TASK", ListId, taskId}) as const
export const addTaskAC = (listId: string, title: string) => ({type: "ADD-TASK", listId, title}) as const
export const changeIdDoneAC = (todoListId: string, taskId: string, done: boolean) => ({
    type: "CHANGE-IS-DONE",
    todoListId,
    taskId,
    done
}) as const
export const addTodoListAc = (title: string) => ({type: "ADD-TODO-LIST", title, listId: v1()}) as const
export const setTAsksAC = (tasks: TasksType[], todoListId: string) => ({type: "SET-TASKS", tasks, todoListId}) as const

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todoListId)
        .then(res => dispatch(setTAsksAC(res.data.items, todoListId)))
}