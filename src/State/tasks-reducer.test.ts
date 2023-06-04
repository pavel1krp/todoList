import {addTaskAC, changeIdDoneAC, changeTaskTitleAC, deleteTaskAC, taskReducer} from "./task-reducer";
import {v1} from "uuid";
import {TaskObjType} from "../App";
let todolistID1 = v1()
let todolistID2 = v1()
 let tasks: TaskObjType
beforeEach(()=>{
     todolistID1 = v1()
     todolistID2 = v1()
    tasks ={
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }
})

test(('must delete task from tasks obj'),()=>{
    const result = taskReducer(tasks, deleteTaskAC(todolistID1,'1' ))
    expect(result[todolistID1][0].title).toBe('JS')
    expect(result[todolistID2][0].title).toBe('Rest API')
})
test(('must add task for specific list'),()=>{
    const result = taskReducer(tasks, addTaskAC(todolistID2, 'title'))
    expect(result[todolistID1].length).toBe(3)
    expect(result[todolistID2].length).toBe(3)
    expect(result[todolistID2][2].title).toBe('title')
})
test(('must change isDone specific list in specific task'),()=>{
    const result = taskReducer(tasks, changeIdDoneAC(todolistID2, '2', true))
    expect(result[todolistID1][1].isDone).toBe(true)
    expect(result[todolistID2][1].isDone).toBe(true)

})
test(('must change title specific list in specific task'),()=>{
    const result = taskReducer(tasks, changeTaskTitleAC(todolistID2, '2', 'New Title'))
    expect(result[todolistID1][1].title).toBe('JS')
    expect(result[todolistID2][1].title).toBe('New Title')

})