import axios, {AxiosResponse} from 'axios'

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TasksType[]
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1136952c-a2c5-4464-80fa-484fab36a6a8',
    }
})
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(
            `todo-lists/${todolistId}`,
            {title: title},
        )
        return promise
    },
    getTodoLists() {
        const promise = instance.get<Array<TodoListType>>('todo-lists')
        return promise
    },
    deleteTodoLists(todoListId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todoListId}`)
        return promise
    }, createTodoList(title: string) {
        const promise = instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists/`, {title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get((`todo-list/${todolistId}/tasks`))
    },
    createTask(listId:string, taskTitle:string){
        return instance.post<{title:string}, AxiosResponse<ResponseType<{item:TasksType}>>>(`todo-lists/${listId}/tasks`)
    }
}