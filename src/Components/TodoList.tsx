import React, {useCallback, useEffect} from 'react';
import {FilterValueType, TaskType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {InputForm} from "./InputForm";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {useDispatch} from "react-redux";
import {addTaskAC} from "../State/task-reducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, deleteTodoListAc} from "../State/todoList-reducer";
import {Task} from "./Task";
import {todolistAPI} from "../Api/todoList-api";

type TodoListPropsType = {
    list: TaskType[]
    ListId: string
    title: string
    filter: FilterValueType
}

export const TodoList = React.memo( (props: TodoListPropsType) => {

    useEffect(()=>{

    },[])

    const {
        list, ListId, title, filter, ...restProps
    } = props

    let filteredTask = props.list
    if (props.filter === 'active') {
        filteredTask = filteredTask.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        filteredTask = filteredTask.filter(el => el.isDone)
    }

    const dispatch = useDispatch()

    const mappedTask = filteredTask.map(el => {
        return <Task key={el.id} title={el.title} isDone={el.isDone} listId={ListId} taskId={el.id}/>
    })
    const changeFilterHandler = useCallback(  (value: FilterValueType) => {
        dispatch(changeTodoListFilterAC(ListId, value))
    },[ListId])
    const addTaskHandler = useCallback ((title: string) => {
        dispatch(addTaskAC(ListId, title))
    },[ListId,title])
    const deleteTodoList = useCallback( () => {
        dispatch(deleteTodoListAc(ListId))
    },[ListId])
    const changeListTitleHandler =useCallback( (title: string) => {
        dispatch(changeTodoListTitleAC(ListId, title))
    },[ListId])
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
                <Button color={"success"} onClick={() => changeFilterHandler("all")}
                        variant={filter === 'all' ? 'outlined' : 'contained'}>All</Button>
                <Button color={"error"} onClick={() => changeFilterHandler("active")}
                        variant={filter === 'active' ? 'outlined' : 'contained'}>Active</Button>
                <Button color={"secondary"} onClick={() => changeFilterHandler("completed")}
                        variant={filter === 'completed' ? 'outlined' : 'contained'}>Completed</Button>
            </div>

        </div>
    );
});
