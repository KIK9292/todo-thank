import React, {useEffect} from 'react';
import s from './App.module.css';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from "./Data/Redux/Store";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "./Data/Redux/Reducers/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {logoutTC, statusLoginTC} from "./Data/Redux/Reducers/authReducer";
import {MyAppTodolist} from "./components/MyAppTodolist/myAppTodolist";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
    let status = useAppSelector<RequestStatusType>(state => state.App.status)
    let isInitialized = useAppSelector<boolean>(state => state.Auth.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.Auth.isLoggedIn)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(statusLoginTC())
    },[isLoggedIn])


    const onLogoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>

            <CircularProgress/>
        </div>
    }
      return (
        <div className={s.AppWrapper}>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    {
                        !isLoggedIn
                            ? <NavLink to={'login'}>
                                <Button color="inherit">Login</Button>
                            </NavLink>
                            : <Button color="inherit" onClick={onLogoutHandler}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Routes>
                <Route path='/' element={<MyAppTodolist/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<Navigate to={'404'}/>}/>
                <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>


        </div>
    );
}

export default App;