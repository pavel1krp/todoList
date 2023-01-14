import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from "uuid";
import {InputForm} from "./Components/InputForm";

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
    [key:string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskObjType>({
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
        setTodolists(todolists.map(el => el.id === todoListId ? {...el, filter: value} : el))
    }
    const addTask =(listId:string, title:string)=>{
        setTasks({...tasks, [listId]:[...tasks[listId], {id: v1(), title: title, isDone: false}]})
    }
    const addTodoList =(title:string)=>{
        const listID = v1()
        setTodolists([{id: listID, title: title, filter: 'all'},...todolists])
        setTasks({...tasks, [listID]:[]})
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
                      title={el.title}
                      addTask={addTask}
            />
        )
    })
    return (
        <div className="App">
            <InputForm addItem={addTodoList}/>
            {mappedTodoLIst}
        </div>
    );
}

export default App;
