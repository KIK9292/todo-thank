import {TodoItemResponceType} from "../../API/APITypes";
import {todolistAPI} from "../../API/TodolistAPI";
import {AllThunkType} from "../Store";

export type TodoReducerActionType = GetTodoACType
export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type DomainType=TodoItemResponceType &{
    filter:FilterValuesType
}


export const TodolistReducer = (state:DomainType[] = [], action: TodoReducerActionType):DomainType[] => {
    switch(action.type){
        case 'SET-TODOLISTS' :{
            return action.payload.todos.map((el)=>{
                return {...el,filter:'All'}
            })
        }
        default:  return state
    }
}
export type GetTodoACType=ReturnType<typeof getTodoAC>
export const getTodoAC = (todos: TodoItemResponceType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {todos}
    }as const
}
export const getTodoTC = (): AllThunkType => {
    return (dispatch) => {
        todolistAPI.getTodolists()
            .then(res=>dispatch(getTodoAC(res.data)))
    }
}