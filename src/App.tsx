import React from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {InputForm} from "./Components/InputForm";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC, deleteTodoListAc,
    todoListReducer,
    todoListReducerActionType
} from "./State/todoList-reducer";
import {
    addTaskAC,
    addTodoListAc,
    changeIdDoneAC, changeTaskTitleAC,
    deleteTaskAC,
} from "./State/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import ButtonAppBar from "./Components/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskObjType = {
    [key: string]: TaskType[]
}

function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todoList)
    const tasks = useSelector<AppRootStateType, TaskObjType>(state => state.task)
    const deleteTask = (ListId: string, taskId: string) => {
        dispatch(deleteTaskAC(ListId, taskId))
    }
    const changeIsDoneInput = (todoListId: string, taskId: string, done: boolean) => {
        dispatch(changeIdDoneAC(todoListId, taskId, done))
    }
    const changeTodoListFilter = (todoListId: string, value: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }
    const addTask = (listId: string, title: string) => {
        dispatch(addTaskAC(listId, title))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodoListAc(title))
    }
    const changeTaskTitle = (listId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(listId, taskId, title))
    }
    const changeTodoListTitle = (listId: string, title: string) => {
        dispatch(changeTodoListTitleAC(listId, title))
    }
    const deleteList = (listId: string) => {
        dispatch(deleteTodoListAc(listId))
    }
    const mappedTodoLIst = todolists.map(el => {
        let filteredTask = tasks[el.id]
        if (el.filter === 'active') {
            filteredTask = filteredTask.filter(el => !el.isDone)
        }
        if (el.filter === 'completed') {
            filteredTask = filteredTask.filter(el => el.isDone)
        }
        return (
            <Paper style={{padding: '10px'}}>
                <Grid item>

                    <TodoList key={el.id}
                              list={filteredTask}
                              changeTodoListFilter={changeTodoListFilter}
                              ListId={el.id}
                              changeIsDoneInput={changeIsDoneInput}
                              deleteTask={deleteTask}
                              title={el.title}
                              addTask={addTask}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                              deleteList={deleteList}
                              filter={el.filter}
                    />
                </Grid>
            </Paper>
        )
    })
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                        <InputForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {mappedTodoLIst}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
