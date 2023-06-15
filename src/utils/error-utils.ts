import {Dispatch} from "redux";
import {ResponseType} from "../Api/todoList-api";
import {setErrorAC, SetErrorType, setLoadingStatusAC, SetStatusType} from "../State/app-reducer";

export const handleNetworkError =(dispatch:Dispatch<ErrorUtilsDispatchType>, error:string)=>{
    dispatch(setLoadingStatusAC('failed'))
    dispatch(setErrorAC(error))
}
type ErrorUtilsDispatchType = SetStatusType | SetErrorType

export const handleAppError = <T>(dispatch:Dispatch<ErrorUtilsDispatchType>, data:ResponseType<T>)=>{
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error, please try refresh page!'))
    }
}