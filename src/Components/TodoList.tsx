import React, {ChangeEvent, ChangeEventHandler} from 'react';
import {FilterValueType, TaskType, TodolistsType} from "../App";
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType ={
    list:TaskType[]
    changeTodoListFilter:(todoListId:string, value:FilterValueType)=>void
    ListId:string
    changeIsDoneInput:(todoListId:string, taskId:string, done:boolean)=>void
    deleteTask:(ListId:string, taskId:string)=>void
}

export const TodoList = (props:TodoListPropsType) => {
    const {list,changeTodoListFilter,ListId, changeIsDoneInput,deleteTask, ...restProps} = props
    const mappedTask = list.map(el=>{
        const changeIsDoneHandler=(e: ChangeEvent<HTMLInputElement>)=>{
            changeIsDoneInput(ListId, el.id, e.currentTarget.checked)
        }
        const deleteTaskHandler =()=>{
            deleteTask(ListId,el.id)
        }
        return(
            <li key={el.id}>
                <input onChange={changeIsDoneHandler} type="checkbox" checked={el.isDone}/>
                <EditableSpan title={el.title}/>
                <button onClick={deleteTaskHandler}>x</button>
            </li>
        )
    })
    const changeFilterHandler =(value:FilterValueType)=>{
         changeTodoListFilter( ListId, value)
    }
    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
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
