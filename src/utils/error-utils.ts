import {Dispatch} from "redux";
import {AppReducerActionType, setErrorAC, SetErrorType, setLoadingStatusAC, SetStatusType} from "../State/app-reducer";

export const handleNetworkError =(dispatch:Dispatch<ErrorUtilsDispatchType>, error:string)=>{
    dispatch(setLoadingStatusAC('failed'))
    dispatch(setErrorAC(error))
}
type ErrorUtilsDispatchType = SetStatusType | SetErrorType