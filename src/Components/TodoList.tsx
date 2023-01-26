import React, {ChangeEvent, ChangeEventHandler} from 'react';
import {FilterValueType, TaskType, TodolistsType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {InputForm} from "./InputForm";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

type TodoListPropsType = {
    list: TaskType[]
    changeTodoListFilter: (todoListId: string, value: FilterValueType) => void
    ListId: string
    changeIsDoneInput: (todoListId: string, taskId: string, done: boolean) => void
    deleteTask: (ListId: string, taskId: string) => void
    title: string
    addTask: (listId: string, title: string) => void
    changeTaskTitle: (listId: string, taskId: string, title: string) => void
    changeTodoListTitle: (listId: string, title: string) => void
    deleteList: (listId: string) => void
    filter:FilterValueType
}

export const TodoList = (props: TodoListPropsType) => {
    const {
        list, changeTodoListFilter, ListId, changeIsDoneInput, deleteTask, title, addTask,
        changeTaskTitle, changeTodoListTitle, deleteList,filter, ...restProps
    } = props

    const mappedTask = list.map(el => {
        const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeIsDoneInput(ListId, el.id, e.currentTarget.checked)
        }
        const deleteTaskHandler = () => {
            deleteTask(ListId, el.id)
        }
        const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(ListId, el.id, newTitle)
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
        changeTodoListFilter(ListId, value)
    }
    const addTaskHandler = (title: string) => {
        addTask(ListId, title)
    }
    const deleteTodoList = () => {
        deleteList(ListId)
    }
    const changeListTitleHandler = (title: string) => {
        changeTodoListTitle(ListId, title)
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
