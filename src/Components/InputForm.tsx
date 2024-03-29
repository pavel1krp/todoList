import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

type InputFormPropsType = {
    addItem: (title: string) => void
}

export const InputForm = React.memo((props: InputFormPropsType) => {
    const {addItem, ...restProps} = props
    const [error, serError] = useState<null | string>(null)
    const [title, setTitle] = useState('');
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            serError(null)
        }

        setTitle(e.currentTarget.value)
    }
    const addTextHandler = useCallback(() => {
        if (title.trim() !== '') {
            addItem(title)
        } else {
            serError('Wrong value!')
        }
        setTitle('')
    }, [title])
    const addTextOnPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            addTextHandler()
        }
    }
    return (
        <div>
            <TextField onKeyDown={addTextOnPressHandler}
                       onChange={changeInputValue}
                       value={title}
                       id="outlined-basic"
                       label={error ? 'Title is required!' : "Title"}
                       variant="outlined"
                       size={"small"}
                       error={!!error}
            />
            <Button style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                    size={"small"} variant={"contained"}
                    onClick={addTextHandler}>+
            </Button>
        </div>
    );
});