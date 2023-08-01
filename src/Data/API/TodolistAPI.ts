import axios, {AxiosResponse} from "axios";
import {
    ResponceType,
    TasksPutRequestModelType,
    TasksRequestType,
    TasksType,
    TodoItemResponceType,

} from "./APITypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fdf6f163-b057-4eee-9b85-ec1216c43810'
    }
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodoItemResponceType[]>('todo-lists')
    },
    postTodolists(title: string) { //<100
        return instance.post<null, ResponceType<{ item: TodoItemResponceType }>,
            { title: string }>('todo-lists', {title})
    },
    deleteTodolists(todolistID: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistID}`)
    },
    putTodolists(todolistID: string, title: string) {
        return instance.put<null, ResponceType, { title: string }>(`todo-lists/${todolistID}`, {title})
    },
    putReorderTodo(todolistID: string, putAfterItemId: string) {
        return instance.put<null, ResponceType, { putAfterItemId: string }>(`todo-lists/${todolistID}/tasks`, {putAfterItemId})
    },
    getTasks(todolistID: string,) {
        return instance.get<TasksRequestType>(`todo-lists/${todolistID}/tasks`)
    },
    postTasks(todolistID: string, title: string) {
        return instance.post<null, ResponceType, { title: string }>(`todo-lists/${todolistID}/tasks`, {title})
    },
    putTask(todolistID: string, taskID: string,model:TasksPutRequestModelType) {
        return instance.put<null, AxiosResponse<ResponceType<{item:TasksType}>>, TasksPutRequestModelType>(`todo-lists/${todolistID}/tasks/${taskID}`,model)
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    reorderTasks(todolistID: string, taskID: string, putAfterItemId: string) {
        return instance.put<null, ResponceType, { putAfterItemId: string }>(`todo-lists/${todolistID}/tasks/${taskID}/reorder`, {putAfterItemId})
    }
}