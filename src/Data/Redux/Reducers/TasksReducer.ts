import {GetTodoACType} from "./TodolistReducer";
import {TasksType} from "../../API/APITypes";
import {AllThunkType} from "../Store";
import {todolistAPI} from "../../API/TodolistAPI";


export type TasksReducerActionType =
    | GetTodoACType
    | setTasksACType

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


export const getTasksTC = (todolistId: string):AllThunkType => {
    return (dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
    }
}