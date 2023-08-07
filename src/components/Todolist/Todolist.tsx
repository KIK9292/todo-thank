import React from 'react';
import {Tasks} from "../Tasks/Tasks";
import Paper from "@mui/material/Paper/";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import s from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddIemForm";
import {useSelector} from "react-redux";
import {RootReducerType, useAppDispatch} from "../../Data/Redux/Store";
import {addNewTaskTC, TasksReducerState} from "../../Data/Redux/Reducers/TasksReducer";
import {
    FilterValuesType,
    removeTodolistTC,
    updateStatusFilterAC,
    updateTitleTodoTC
} from "../../Data/Redux/Reducers/TodolistReducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {RequestStatusType} from "../../Data/Redux/Reducers/app-reducer";

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    filterStatus:FilterValuesType
    entityStatus:RequestStatusType
}


export const Todolist = (props: TodolistPropsType) => {
    const {todolistId, todolistTitle,filterStatus,entityStatus} = props
    const dispatch = useAppDispatch()
    const tasks = useSelector<RootReducerType, TasksReducerState>(state => state.Tasks)
    const onClickHandler=()=>{
        dispatch(removeTodolistTC(todolistId))
    }
    const onClickUpdateStatusFilterButton=(newStatus:FilterValuesType)=>{
dispatch(updateStatusFilterAC(todolistId,newStatus))
    }
    const addNewTaskCallback=(newTask:string)=>{
        dispatch(addNewTaskTC(todolistId,newTask))
    }
    const updateTitleTodoCallback=(newTitleTodo:string)=>{
dispatch(updateTitleTodoTC(todolistId,newTitleTodo))
    }
        return (
        <div className={s.TodolistWrapper}><Paper elevation={6}>
            <div className={s.nameTodolistContainer}>
                {/*<h2>{todolistTitle}</h2>*/}
                <h2><EditableSpan value={todolistTitle} onChange={updateTitleTodoCallback} style={''}/></h2>
                <IconButton aria-label="delete" size="large" onClick={onClickHandler} disabled={entityStatus==='loading'}>
                    <DeleteIcon/>
                </IconButton></div>
            <AddItemForm callback={addNewTaskCallback} disabled={entityStatus==='loading'}/>
            <Tasks todolistId={todolistId} filterStatus={filterStatus}/>
            {tasks[todolistId].length !== 0 &&
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={()=>onClickUpdateStatusFilterButton('All')} disabled={filterStatus==='All'} >All</Button>
                <Button onClick={()=>onClickUpdateStatusFilterButton('Active')} disabled={filterStatus==='Active'} >Active</Button>
                <Button onClick={()=>onClickUpdateStatusFilterButton('Completed')} disabled={filterStatus==='Completed'}>Completed</Button>
              </ButtonGroup>}

        </Paper></div>
    );
};

