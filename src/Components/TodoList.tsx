import React from 'react';
import {TaskType, TodolistsType} from "../App";

type TodoListPropsType ={
    list:TaskType[]
}

export const TodoList = (props:TodoListPropsType) => {
    const {list, ...restProps} = props
    const mappedTask = list.map(el=>{
        return(
            <li>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <button>x</button>
            </li>
        )
    })
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>

        </div>
    );
};
