import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import React, {ChangeEvent, useCallback} from 'react';
import {TaskStatuses, TasksType} from "../Api/todoList-api";
import {useAppDispatch} from "../State/store";
import {changeTaskStatusTC, changeTaskTitleAC, deleteTaskTC} from "../State/task-reducer";
import {EditableSpan} from "./EditableSpan";

type PropsTaskType ={
    listId:string
    taskId:string
    title:string
    isDone:boolean
    task:TasksType
}
export const Task = React.memo ((props:PropsTaskType) => {
    const {listId, taskId,title,isDone, ...restProps} = props
    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusTC(listId, taskId, e.currentTarget.checked?  TaskStatuses.Completed:TaskStatuses.New))
    },[listId,taskId])
    const deleteTaskHandler =useCallback( () => {
        dispatch(deleteTaskTC(listId,taskId))
    },[listId, taskId])
    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(listId, taskId, newTitle))
    },[listId, taskId])

    return (
        <li key={taskId}>
            <Checkbox onChange={changeTaskStatusHandler} checked={props.task.status === TaskStatuses.Completed}  />
            <EditableSpan title={title} changeTitle={changeTaskTitleHandler}/>
            <IconButton onClick={deleteTaskHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    )
});

