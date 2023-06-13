import {TaskObjType} from "../App";
import {v1} from "uuid";
import {setErrorStatusAC, setLoadingStatusAC} from "./app-reducer";
import {AppRootStateType} from "./store";
import {setTodoListAcType} from "./todoList-reducer";
import {Dispatch} from "redux";
import {
    TaskPriorities,
    TaskStatuses,
    TasksType,
    todolistAPI,
    TodoListType,
    UpdateTaskModelType
} from "../Api/todoList-api";

const initialState: TaskObjType = {}

export const taskReducer = (state: TaskObjType = initialState, action: taskReducerActionType): TaskObjType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {...state, [action.ListId]: state[action.ListId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state, [action.listId]: [...state[action.listId], action.task]
            }
        case 'CHANGE-TASK-STATUS':
            return ({
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(el => el.id === action.taskId ? {...el, ...action.model} : el)
            })
        case 'ADD-TODO-LIST':
            return {...state, [action.todoList.id]: []}
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
    setTodoListAcType |
    setTAsksACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type  changeIdDoneACType = ReturnType<typeof changeTAskStatusAC>
export type  addTodoListAcType = ReturnType<typeof addTodoListAc>
export type setTAsksACType = ReturnType<typeof setTAsksAC>

export const deleteTaskAC = (ListId: string, taskId: string) => ({type: "DELETE-TASK", ListId, taskId}) as const
export const addTaskAC = (listId: string, task: TasksType) => ({type: "ADD-TASK", listId, task}) as const
export const changeTAskStatusAC = (todoListId: string, taskId: string, model: UpdateTaskModelType) => ({
    type: "CHANGE-TASK-STATUS",
    todoListId,
    taskId,
    model
}) as const
export const addTodoListAc = (todoList: TodoListType) => ({type: "ADD-TODO-LIST", todoList}) as const
export const setTAsksAC = (tasks: TasksType[], todoListId: string) => ({type: "SET-TASKS", tasks, todoListId}) as const

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.getTasks(todoListId)
        .then(res => {
                dispatch(setTAsksAC(res.data.items, todoListId))
                dispatch(setLoadingStatusAC('succeeded'))
            }
        )
}
export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.deleteTask(todoListId, taskId)
        .then(res => {
                dispatch(setLoadingStatusAC('succeeded'))
                dispatch(deleteTaskAC(todoListId, taskId))
            }
        )
}
export const createTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.createTask(todoId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(todoId, res.data.data.item))
                } else {
                    if(res.data.messages.length){
                        dispatch(setErrorStatusAC(res.data.messages[0]))
                    }else {
                        dispatch(setErrorStatusAC('Some error, please try refresh page!'))
                    }

                }
                dispatch(setLoadingStatusAC('idle'))
            }
        )
}

interface FlexType {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const UpdateTaskTC = (todoListId: string, taskId: string, data: FlexType) =>
    (dispatch: Dispatch, getStata: () => AppRootStateType) => {
        dispatch(setLoadingStatusAC('loading'))
        const task = getStata().task[todoListId].find(t => t.id === taskId)

        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                startDate: task.startDate,
                priority: task.priority,
                status: task.status,
                ...data
            }

            todolistAPI.updateTask(todoListId, taskId, model)
                .then(res => {
                        dispatch(setLoadingStatusAC('succeeded'))
                        dispatch(changeTAskStatusAC(todoListId, taskId, model))
                    }
                )
        }


    }