import axios from 'axios'

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{
        'API-KEY': '1136952c-a2c5-4464-80fa-484fab36a6a8',
    }
})
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(
            `todo-lists/${todolistId}`,
            { title: title },
        )
        return promise
    },
    getTodoLists(){
        const promise = instance.get('todo-lists')
        return promise
    }
}