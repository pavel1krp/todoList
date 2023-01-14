import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from "uuid";

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

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    const deleteTask = (ListId: string, taskId: string) => {
        setTasks({...tasks, [ListId]: tasks[ListId].filter(el => el.id !== taskId)})
    }
    const changeIsDoneInput = (todoListId: string, taskId: string, done: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: done} : el)})
    }
    const changeTodoListFilter = (todoListId: string, value: FilterValueType) => {
        console.log(todoListId)
        console.log(value)
        setTodolists(todolists.map(el => el.id === todoListId ? {...el, filter: value} : el))
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
            <TodoList key={el.id}
                      list={filteredTask}
                      changeTodoListFilter={changeTodoListFilter}
                      ListId={el.id}
                      changeIsDoneInput={changeIsDoneInput}
                      deleteTask={deleteTask}
            />
        )
    })
    return (
        <div className="App">
            {mappedTodoLIst}
        </div>
    );
}

export default App;
