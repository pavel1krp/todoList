import React, {ChangeEvent, useState} from 'react';

type InputFormPropsType = {
    addTask: (title:string)=>void
}

export const InputForm = (props:InputFormPropsType) => {
    const {addTask, ...restProps}= props
    const [error, serError]= useState('')
    const [title, setTitle] = useState('');
    const changeInputValue = (e:ChangeEvent<HTMLInputElement>)=>{
        serError('')
        setTitle(e.currentTarget.value)
    }
    const addTextHandler =()=>{
        if(title.trim()!==''){
            addTask(title)
        }
       else{
           serError('Wrong value!')
        }
       setTitle('')
    }
    return (
        <div>
            <input onChange={changeInputValue} value={title}/>
            <button onClick={addTextHandler}>+</button>
            {error? <div>{error}</div>: null}
        </div>
    );
};