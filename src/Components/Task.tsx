import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import React, {ChangeEvent, useCallback} from 'react';
import {TaskStatuses, TasksType} from "../Api/todoList-api";
import {useAppDispatch} from "../State/store";
import {deleteTaskTC, UpdateTaskTC} from "../State/task-reducer";
import {EditableSpan} from "./EditableSpan";

type PropsTaskType = {
    listId: string
    taskId: string
    title: string
    isDone: boolean
    task: TasksType
}
export const Task = React.memo((props: PropsTaskType) => {
    const {listId, taskId, title, isDone, task} = props
    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(UpdateTaskTC(listId, taskId, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [listId, taskId, dispatch])
    const deleteTaskHandler = useCallback(() => {
        dispatch(deleteTaskTC(listId, taskId))
    }, [listId, taskId, dispatch])
    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(UpdateTaskTC(listId, taskId, {title:newTitle}))
    }, [listId, taskId, dispatch])

    return (
        <li key={taskId}>
            <Checkbox onChange={changeTaskStatusHandler} checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={title} changeTitle={changeTaskTitleHandler}/>
            <IconButton onClick={deleteTaskHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    )
});

