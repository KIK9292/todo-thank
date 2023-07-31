import React from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./Task.module.css"
import Checkbox from "@mui/material/Checkbox";

type TaskPropsType={
    titleTask:string
    todolistId:string
}


export const Task = (props:TaskPropsType) => {
    const {todolistId,titleTask}=props
    return (
        <div className={s.TaskWrapper}>
            <Checkbox />
            <h3>{titleTask}</h3>
            <IconButton aria-label="delete" size="large">
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};

