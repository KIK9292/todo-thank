import {GetTodoACType, RemoveTodolistACType} from "./TodolistReducer";
import {TasksPutRequestModelType, TaskStatuses, TasksType} from "../../API/APITypes";
import {AllThunkType, RootReducerType} from "../Store";
import {todolistAPI} from "../../API/TodolistAPI";


export type TasksReducerActionType =
    | GetTodoACType
    | setTasksACType
    | RemoveTaskACType
    | RemoveTodolistACType
    | UpdateTaskACType

export type TasksReducerState = {
    [key: string]: TasksType[]
}

export const TasksReducer = (state: TasksReducerState = {}, action: TasksReducerActionType): TasksReducerState => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            let newState = {...state}
            action.payload.todos.forEach(el => newState[el.id] = [])
            return newState
        }
        case "SET-TASKS": {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }
        case "UPDATE-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? action.payload.task : el)
            }
        }
        default:
            return state
    }
}
type setTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TasksType[]) => {
    return {
        type: "SET-TASKS",
        payload: {todolistId, tasks}
    } as const
}
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todolistId, taskId}
    } as const
}
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, task: TasksType) => {
    return {
        type: "UPDATE-STATUS",
        payload: {todolistId, taskId, task}
    } as const
}

export const getTasksTC = (todolistId: string): AllThunkType => {
    return (dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AllThunkType => {
    return (dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => dispatch(removeTaskAC(todolistId, taskId)))
    }
}
export const updateStatusTaskTC = (todolistId: string, taskId: string, newStatus: TaskStatuses): AllThunkType => {
    return (dispatch, getState: () => RootReducerType) => {
        let task = getState().Tasks[todolistId].find(f => f.id === taskId)
        if (task) {
            const model: TasksPutRequestModelType = {
                title: task.title,
                description: task.description,
                completed: !task.completed,
                status: newStatus,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }
            todolistAPI.putTask(todolistId, taskId, model)
                // .then(res=>console.log(res.data.data.item))
                .then(res => dispatch(updateTaskAC(todolistId, taskId, res.data.data.item)))
        }

    }
}