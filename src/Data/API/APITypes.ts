export type ResponceType<D={}> = {
    data: D
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
}
export type TasksUpdateResponseType = {
    data: {
        item: TasksType
    },
    resultCode: number
    messages: string[],
    fieldsErrors: string[],
}
export type TodoItemResponceType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TasksPutRequestModelType= {
    title: string
    description: null|string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: null|string
    deadline: null| string
}
export type TasksRequestType = {
    items: TasksType[]
    totalCount: number
    error: null | string
}
export type TasksType = {
    id: string
    title: string
    description: null|string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: null|string
    deadline: null|string
    addedDate: string
    completed?: boolean
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
export type authModelResponse={
    id: number
    email: string
    login: string
}