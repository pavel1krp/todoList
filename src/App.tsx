import React from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {InputForm} from "./Components/InputForm";
import {
    addTodoListAc,
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
    const addTodoList = (title: string) => {
        dispatch(addTodoListAc(title))
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
            <Paper  key={el.id} style={{padding: '10px',margin:'10px'}}>
                <Grid  key={el.id} item>

                    <TodoList key={el.id}
                              list={filteredTask}
                              ListId={el.id}
                              title={el.title}
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
                <Grid container style={{padding: '20px'}}>
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
