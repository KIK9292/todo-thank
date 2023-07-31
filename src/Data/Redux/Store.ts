import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodolistReducer, TodoReducerActionType} from "./Reducers/TodolistReducer";
import {TasksReducer, TasksReducerActionType} from "./Reducers/TasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export const rootReducer =combineReducers({
    Todolist:TodolistReducer,
    Tasks:TasksReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
export type RootReducerType=ReturnType<typeof rootReducer>
export type AllActionType=TasksReducerActionType|TodoReducerActionType
export type AppDispatchType=ThunkDispatch<RootReducerType, unknown, AnyAction>
export type AllThunkType<ReturnType=void>=ThunkAction<ReturnType, RootReducerType, unknown, AllActionType>
export const useAppDispatch=useDispatch<AppDispatchType>
