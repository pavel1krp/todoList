import React, {useEffect} from 'react';
import './App.css';
import {TasksType} from "./Api/todoList-api";
import {LinearIndeterminate} from "./Components/ProgressLinear";
import {TodoList} from "./Components/TodoList";
import {InputForm} from "./Components/InputForm";
import {
    addTodoListAc,
} from "./State/task-reducer";
import {useAppDispatch, useAppSelector} from "./State/store";
import ButtonAppBar from "./Components/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {createTodoTC, getTodoTC} from "./State/todoList-reducer";

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
    [key: string]: TasksType[]
}

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodoTC())
    }, [])

    const todolists = useAppSelector<TodolistsType[]>(state => state.todoList)
    const tasks = useAppSelector<TaskObjType>(state => state.task)
    const addTodoList = (title: string) => {
        dispatch(createTodoTC(title))
    }
    const mappedTodoLIst = todolists.map(el => {
        return (
            <Paper key={el.id} style={{padding: '10px', margin: '10px'}}>
                <Grid key={el.id} item>

                    <TodoList key={el.id}
                              list={tasks[el.id]}
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
            {0?  <LinearIndeterminate />:null}
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
