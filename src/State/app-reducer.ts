export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerActionType = SetStatusType
const initialState = {
    status: 'succeeded' as RequestStatusType
}

type InitStateType = typeof initialState

export const appReducer = (state: InitStateType = initialState, action: AppReducerActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default: return state
    }
}

export type SetStatusType = ReturnType<typeof setStatusAC>

export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const