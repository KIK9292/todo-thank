import {TodoItemResponceType} from "../../API/APITypes";
import {todolistAPI} from "../../API/TodolistAPI";
import {AllThunkType} from "../Store";

export type TodoReducerActionType = GetTodoACType
    | RemoveTodolistACType
    | UpdateStatusFilterACType
    | AddNewTodolistACType

export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type DomainType = TodoItemResponceType & {
    filter: FilterValuesType
}


export const TodolistReducer = (state: DomainType[] = [], action: TodoReducerActionType): DomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS' : {
            return action.payload.todos.map((el) => {
                return {...el, filter: 'All'}
            })
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "UPDATE-STATUS-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.newStatus} : el)
        }
        case "ADD-TODOLIST": {
            let newTodo:DomainType = {
                id: action.payload.todo.id,
                title: action.payload.todo.title,
                addedDate: action.payload.todo.addedDate,
                order: action.payload.todo.order,
                filter: 'All'
            }
            return [...state, newTodo]
        }
        default:
            return state
    }
}
export type GetTodoACType = ReturnType<typeof getTodoAC>
export const getTodoAC = (todos: TodoItemResponceType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {todos}
    } as const
}
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todolistId}
    } as const
}
export type UpdateStatusFilterACType = ReturnType<typeof updateStatusFilterAC>
export const updateStatusFilterAC = (todolistId: string, newStatus: FilterValuesType) => {
    return {
        type: "UPDATE-STATUS-FILTER",
        payload: {todolistId, newStatus}
    } as const
}
export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (todo: TodoItemResponceType) => {
    return {
        type: "ADD-TODOLIST",
        payload: {todo}
    } as const
}
export const getTodoTC = (): AllThunkType => {
    return (dispatch) => {
        todolistAPI.getTodolists()
            .then(res => dispatch(getTodoAC(res.data)))
    }
}

export const removeTodolistTC = (todolistId: string): AllThunkType => {
    return (dispatch) => {
        todolistAPI.deleteTodolists(todolistId)
            .then(res => dispatch(removeTodolistAC(todolistId)))
    }
}
export const addNewTodolistTC=(newTodo:string):AllThunkType=>{
    return (dispatch)=>{
        todolistAPI.postTodolists(newTodo)
            .then(res=>dispatch(addNewTodolistAC(res.data.data.item)))
    }
}