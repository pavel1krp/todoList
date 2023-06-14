export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState
export type AppReducerActionType = SetStatusType | SetErrorType

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType):InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetStatusType = ReturnType<typeof setLoadingStatusAC>
export type SetErrorType = ReturnType<typeof setErrorAC>

export const setLoadingStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error}) as const

// export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//
// const initialState = {
//     status: 'loading' as RequestStatusType,
//     error: null as null | string
// }
//
// type InitialStateType = typeof initialState
// export type AppActionType = SetLoadingStatus | SetErrorStatus
//
// export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
//     switch (action.type) {
//         case 'SET-STATUS':
//             return {...state, status: action.status}
//         case 'SET-ERROR': {
//             return {...state, error: action.error}
//         }
//         default:
//             return state
//     }
// }
//
// export const setLoadingStatus = (status: RequestStatusType) => ({type: "SET-STATUS", status} as const)
// export const setErrorStatus = (error: string | null) => ({type: "SET-ERROR", error} as const)
//
// type SetLoadingStatus = ReturnType<typeof setLoadingStatus>
// type SetErrorStatus = ReturnType<typeof setErrorStatus>