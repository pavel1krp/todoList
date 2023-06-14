import React, {FC, useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {setErrorAC} from "../State/app-reducer";
import {useAppDispatch, useAppSelector} from "../State/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorBar:FC = () => {

    const error = useAppSelector<null | string>(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setErrorAC(null))
    }
    return (
        <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}