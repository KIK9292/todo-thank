import React, {useEffect} from 'react';
import {RootReducerType, useAppDispatch} from "../../Data/Redux/Store";
import {useSelector} from "react-redux";
import {getTasksTC, TasksReducerState} from "../../Data/Redux/Reducers/TasksReducer";
import {Task} from "../Task/Task";

type TasksPropsType={
    todolistId:string

}

export const Tasks = (props:TasksPropsType) => {
    const {todolistId}=props
    const dispatch = useAppDispatch()
useEffect(()=>{
    dispatch(getTasksTC(todolistId))
},[])
    const tasks=useSelector<RootReducerType,TasksReducerState>(state => state.Tasks)

    return (
        <div>

            {tasks[todolistId].map(el=>{
                return (
                    <Task  key={el.id} titleTask={el.title} todolistId={todolistId}/>
                )
            })}

        </div>
    );
};

