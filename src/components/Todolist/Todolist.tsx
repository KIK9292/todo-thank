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
import {RootReducerType} from "../../Data/Redux/Store";
import {TasksReducerState} from "../../Data/Redux/Reducers/TasksReducer";

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
}


export const Todolist = (props: TodolistPropsType) => {
    const {todolistId, todolistTitle} = props
    const tasks = useSelector<RootReducerType, TasksReducerState>(state => state.Tasks)
    return (
        <div className={s.TodolistWrapper}><Paper elevation={6}>
            <div className={s.nameTodolistContainer}><h2>{todolistTitle}</h2>
                <IconButton aria-label="delete" size="large">
                    <DeleteIcon/>
                </IconButton></div>
            <AddItemForm callback={() => {
            }}/>
            <Tasks todolistId={todolistId}/>
            {tasks[todolistId].length !== 0 &&
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
              </ButtonGroup>}

        </Paper></div>
    );
};

