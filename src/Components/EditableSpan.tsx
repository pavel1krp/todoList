import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState('')
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeEditable = () => {
        setEditable(!editable)
        props.changeTitle(title)
    }
    return (
        editable ?
            <input value={title} onChange={changeTitleHandler} onBlur={changeEditable} autoFocus type="text"/> :
            <span onDoubleClick={changeEditable}>{props.title}</span>
    );
};

