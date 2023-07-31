export type TodoResponceType<D={}> = {
    data: D
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
}
export type TodoItemResponceType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TasksPutRequestModelType= {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: null|string
    deadline: null| string
}
export type TasksUpdateResponseType = {
    data: {
        item: TasksType
    },
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
export type TasksRequestType = {
    items: TasksType[]
    totalCount: number
    error: null | string
}
export type TasksType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
    completed?: boolean
}
