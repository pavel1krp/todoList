import {TaskPriorities, TaskStatuses} from "../Api/todoList-api";
import {deleteTaskAC, taskReducer} from "./task-reducer";
import {v1} from "uuid";
import {TaskObjType} from "../App";

let todolistID1 = v1()
let todolistID2 = v1()
let tasks: TaskObjType

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    tasks = {
        [todolistID1]: [
            {
                description: 'string',
                title: 'string',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                id: '1',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                description: 'string',
                title: 'string',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                description: 'string',
                title: 'string',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                id: '3',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ],
        [todolistID2]: [
            {
                description: 'string',
                title: 'string',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                id: '1',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                description: 'string',
                title: 'STRONG',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                description: 'string',
                title: 'string',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            }
        ]
    }
})

test(('must delete task from tasks obj'), () => {
    const result = taskReducer(tasks, deleteTaskAC(todolistID2, '1'))
    expect(result[todolistID1][0].title).toBe('string')
    expect(result[todolistID2][0].title).toBe('STRONG')
})
// test(('must add task for specific list'),()=>{
//     const result = taskReducer(tasks, addTaskAC(todolistID2, ))
//     // expect(result[todolistID1].length).toBe(3)
//     // expect(result[todolistID2].length).toBe(3)
//     console.log(result)
//     expect(result[todolistID2][2].title).toBe('title')
// })
// test(('must change isDone specific list in specific task'), () => {
//     const result = taskReducer(tasks, changeTAskStatusAC(todolistID2, '2', true))
//     expect(result[todolistID1][1].completed).toBe(true)
//     expect(result[todolistID2][1].completed).toBe(true)
//
// })