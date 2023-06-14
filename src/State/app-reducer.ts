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
