import React, {ChangeEvent, useState} from 'react';

type InputFormPropsType = {
    addTask: (title:string)=>void
}

export const InputForm = (props:InputFormPropsType) => {
    const {addTask, ...restProps}= props
    const [title, setTitle] = useState('');
    const changeInputValue = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const addTextHandler =()=>{
        addTask(title)
    }
    return (
        <div>
            <input onChange={changeInputValue} value={title}/>
            <button onClick={addTextHandler}>+</button>
        </div>
    );
};