import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodolistReducer, TodoReducerActionType} from "./Reducers/TodolistReducer";
import {TasksReducer, TasksReducerActionType} from "./Reducers/TasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, AppReducerActionsType} from "./Reducers/app-reducer";

export const rootReducer =combineReducers({
    Todolist:TodolistReducer,
    Tasks:TasksReducer,
    App:appReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
export type RootReducerType=ReturnType<typeof rootReducer>
export type AllActionType=TasksReducerActionType|TodoReducerActionType|AppReducerActionsType
export type AppDispatchType=ThunkDispatch<RootReducerType, unknown, AnyAction>
export type AllThunkType<ReturnType=void>=ThunkAction<ReturnType, RootReducerType, unknown, AllActionType>
export const useAppDispatch=useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector
