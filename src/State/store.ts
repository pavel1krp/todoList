import {AnyAction, combineReducers, createStore, legacy_createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListReducer} from "./todoList-reducer";
import {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers(
    {
        task:taskReducer,
        todoList:todoListReducer
    }
)
export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch =()=> useDispatch<AppThunkDispatch>()
export const useAppSelector:TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store= store