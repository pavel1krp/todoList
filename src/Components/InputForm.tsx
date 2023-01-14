import React, {ChangeEvent, useState} from 'react';

type InputFormPropsType = {
    addItem: (title:string)=>void
}

export const InputForm = (props:InputFormPropsType) => {
    const {addItem, ...restProps}= props
    const [error, serError]= useState('')
    const [title, setTitle] = useState('');
    const changeInputValue = (e:ChangeEvent<HTMLInputElement>)=>{
        serError('')
        setTitle(e.currentTarget.value)
    }
    const addTextHandler =()=>{
        if(title.trim()!==''){
            addItem(title)
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