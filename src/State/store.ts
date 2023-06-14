import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {appReducer} from "./app-reducer";
import {taskReducer} from "./task-reducer";
import {todoListReducer} from "./todoList-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers(
    {
        app:appReducer,
        task: taskReducer,
        todoList: todoListReducer
    }
)
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

//@ts-ignore
window.store = store