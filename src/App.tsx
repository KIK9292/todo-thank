import React from 'react';
import s from './App.module.css';
import {Todolists} from "./components/Todolists/Todolists";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {AddItemForm} from "./components/AddItemForm/AddIemForm";

function App() {


  return (
    <div className={s.AppWrapper}>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    Todolists
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callback={()=>{}}/>
            </Grid>
            <Grid container spacing={3}>
      <Todolists/>
            </Grid>
        </Container>
    </div>
  );
}

export default App;