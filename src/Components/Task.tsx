import React, {ChangeEvent} from 'react';
import {changeIdDoneAC, changeTaskTitleAC, deleteTaskAC} from "../State/task-reducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";

type PropsTaskType ={
    listId:string
    taskId:string
    title:string
    isDone:boolean
}
export const Task = (props:PropsTaskType) => {
    const {listId, taskId,title,isDone, ...restProps} = props
    const dispatch = useDispatch()
    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeIdDoneAC(listId, taskId, e.currentTarget.checked))
    }
    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC(listId,taskId))
    }
    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(listId, taskId, newTitle))
    }
    return (
        <li key={taskId}>
            <Checkbox onChange={changeIsDoneHandler} checked={isDone}  />
            <EditableSpan title={title} changeTitle={changeTaskTitleHandler}/>
            <IconButton onClick={deleteTaskHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    )
};
