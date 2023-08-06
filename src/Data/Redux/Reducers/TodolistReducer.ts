import {TodoItemResponceType} from "../../API/APITypes";
import {todolistAPI} from "../../API/TodolistAPI";
import {AllThunkType, RootReducerType} from "../Store";
import {setNewPreloaderStatusAC} from "./app-reducer";

export type TodoReducerActionType = GetTodoACType
    | RemoveTodolistACType
    | UpdateStatusFilterACType
    | AddNewTodolistACType
|UpdateTitleTodolistACType

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
        case "UPDATE-TITLE-TODOLIST":{
            return state.map(el=>el.id===action.payload.todolistId?{...el,title:action.payload.newTitle}:el)
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
type UpdateTitleTodolistACType=ReturnType<typeof updateTitleTodolistAC>
export const updateTitleTodolistAC=(todolistId:string,newTitle:string)=>{
    return{
        type:"UPDATE-TITLE-TODOLIST",
        payload: {todolistId, newTitle}
    }as const
}
export const getTodoTC = (): AllThunkType => {
    return (dispatch) => {
        dispatch(setNewPreloaderStatusAC('loading'))
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(getTodoAC(res.data))
                dispatch(setNewPreloaderStatusAC('succeeded'))
            })

    }
}

export const removeTodolistTC = (todolistId: string): AllThunkType => {
    return (dispatch) => {
        dispatch(setNewPreloaderStatusAC('loading'))
        todolistAPI.deleteTodolists(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setNewPreloaderStatusAC('succeeded'))
            })
    }
}
export const addNewTodolistTC=(newTodo:string):AllThunkType=>{
    return (dispatch)=>{
        dispatch(setNewPreloaderStatusAC('loading'))
        todolistAPI.postTodolists(newTodo)
            .then(res=> {
                dispatch(addNewTodolistAC(res.data.data.item))
                dispatch(setNewPreloaderStatusAC('succeeded'))
            })
    }
}

export const updateTitleTodoTC=(todolistId:string,newTitleTodo:string):AllThunkType=>{
    return (dispatch)=>{
        dispatch(setNewPreloaderStatusAC('loading'))
       todolistAPI.putTodolists(todolistId,newTitleTodo)
           .then(()=>{dispatch(updateTitleTodolistAC(todolistId,newTitleTodo))
               dispatch(setNewPreloaderStatusAC('succeeded'))})
    }
}