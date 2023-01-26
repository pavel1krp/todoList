import React, {ChangeEvent, ChangeEventHandler} from 'react';
import {FilterValueType, TaskType, TodolistsType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {InputForm} from "./InputForm";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch} from "react-redux";
import {addTaskAC, addTodoListAc, changeIdDoneAC, changeTaskTitleAC, deleteTaskAC} from "../State/task-reducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, deleteTodoListAc} from "../State/todoList-reducer";

type TodoListPropsType = {
    list: TaskType[]
    ListId: string
    title: string
    filter:FilterValueType
}

export const TodoList = (props: TodoListPropsType) => {
    const {
        list, ListId, title,filter, ...restProps
    } = props

    const dispatch = useDispatch()

    const mappedTask = list.map(el => {
        const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeIdDoneAC(ListId, el.id, e.currentTarget.checked))
        }
        const deleteTaskHandler = () => {
            dispatch(deleteTaskAC(ListId,el.id))
        }
        const changeTaskTitleHandler = (newTitle: string) => {
            dispatch(changeTaskTitleAC(ListId, el.id, newTitle))
        }
        return (
            <li key={el.id}>
                <Checkbox onChange={changeIsDoneHandler} checked={el.isDone} defaultChecked />
                <EditableSpan title={el.title} changeTitle={changeTaskTitleHandler}/>
                <IconButton onClick={deleteTaskHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </li>
        )
    })
    const changeFilterHandler = (value: FilterValueType) => {
        dispatch(changeTodoListFilterAC(ListId, value))
    }
    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(ListId,title))
    }
    const deleteTodoList = () => {
        dispatch(deleteTodoListAc(ListId))
    }
    const changeListTitleHandler = (title: string) => {
        dispatch(changeTodoListTitleAC(ListId, title))
    }
    return (
        <div>
            <h3><EditableSpan changeTitle={changeListTitleHandler} title={title}/>
                <IconButton onClick={deleteTodoList} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <InputForm addItem={addTaskHandler}/>
            <ul>
                {mappedTask}
            </ul>
            <div>
                <Button color={"success"} onClick={() => changeFilterHandler("all")} variant={filter==='all'? 'outlined':'contained'}>All</Button>
                <Button color={"error"} onClick={() => changeFilterHandler("active")} variant={filter==='active'? 'outlined':'contained'}>Active</Button>
                <Button color={"secondary"} onClick={() => changeFilterHandler("completed")} variant={filter==='completed'? 'outlined':'contained'}>Completed</Button>
            </div>

        </div>
    );
};
