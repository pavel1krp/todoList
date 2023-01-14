import React, {ChangeEvent, ChangeEventHandler} from 'react';
import {FilterValueType, TaskType, TodolistsType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {InputForm} from "./InputForm";

type TodoListPropsType ={
    list:TaskType[]
    changeTodoListFilter:(todoListId:string, value:FilterValueType)=>void
    ListId:string
    changeIsDoneInput:(todoListId:string, taskId:string, done:boolean)=>void
    deleteTask:(ListId:string, taskId:string)=>void
    title:string
    addTask:(listId:string, title:string)=>void
    changeTaskTitle:(listId:string, taskId:string, title:string)=>void
}

export const TodoList = (props:TodoListPropsType) => {
    const {list,changeTodoListFilter,ListId, changeIsDoneInput,deleteTask,title,addTask,
        ...restProps} = props
    const mappedTask = list.map(el=>{
        const changeIsDoneHandler=(e: ChangeEvent<HTMLInputElement>)=>{
            changeIsDoneInput(ListId, el.id, e.currentTarget.checked)
        }
        const deleteTaskHandler =()=>{
            deleteTask(ListId,el.id)
        }
        const changeTaskTitleHandler = (newTitle:string)=>{
            restProps.changeTaskTitle(ListId, el.id,newTitle)
        }
        return(
            <li key={el.id}>
                <input onChange={changeIsDoneHandler} type="checkbox" checked={el.isDone}/>
                <EditableSpan title={el.title} changeTitle={changeTaskTitleHandler}/>
                <button onClick={deleteTaskHandler}>x</button>
            </li>
        )
    })
    const changeFilterHandler =(value:FilterValueType)=>{
         changeTodoListFilter( ListId, value)
    }
    const addTaskHandler = (title:string)=>{
        addTask(ListId,title )
    }
    const deleteTodoList = ()=>{

    }
    return (
        <div>
            <h3><EditableSpan changeTitle={()=>{}} title={title}/><button onClick={deleteTodoList}>x</button></h3>
            <InputForm addItem={addTaskHandler}/>
            <ul>
                {mappedTask}
            </ul>
            <div>
                <button onClick={()=>changeFilterHandler("all")} >All</button>
                <button onClick={()=>changeFilterHandler("active")}>Active</button>
                <button onClick={()=>changeFilterHandler("completed")}>Completed</button>
            </div>

        </div>
    );
};
