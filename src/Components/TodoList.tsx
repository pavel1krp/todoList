import React from 'react';
import {FilterValueType, TaskType, TodolistsType} from "../App";

type TodoListPropsType ={
    list:TaskType[]
    changeTodoListFilter:(todoListId:string, value:FilterValueType)=>void
    ListId:string
}

export const TodoList = (props:TodoListPropsType) => {
    const {list,changeTodoListFilter, ...restProps} = props
    const mappedTask = list.map(el=>{
        return(
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <button>x</button>
            </li>
        )
    })
    const changeFilterHandler =(value:FilterValueType)=>{
         changeTodoListFilter( props.ListId, value)
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
