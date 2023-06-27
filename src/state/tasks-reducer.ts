import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType,RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskACActionType = ReturnType<typeof removeTaskAC>
export type AddTaskACActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskACActionType
    | AddTaskACActionType
    | ChangeTaskStatusACActionType
    | changeTaskTitleACActionType
    | AddTodolistActionType
|RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASKS':
            let task = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}
        case 'CHENGE-STATUS-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.checked
                } : el)
            }
        }
        case 'CHANGE-TITLE' : {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)
            }
        }
        case "ADD-TODOLIST":{
            return {
                ...state,
                [action.todolistId]:[]
            }
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASKS', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (taskId: string, checked: boolean, todolistId: string) => {
    return {type: 'CHENGE-STATUS-TASK', payload: {taskId, checked, todolistId}} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE', payload: {taskId, title, todolistId}} as const
}
