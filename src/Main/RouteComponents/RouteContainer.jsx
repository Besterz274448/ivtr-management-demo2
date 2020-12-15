import React, { useState } from 'react';
import Navbar from './components/NavBar';
import Sidebar from "./components/SideBar";
import MainComponents from './components/MainComponents'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function RouteContainer(){
  const classes = useStyles();

      const [open, setOpen] = React.useState(false);

        const handleDrawerOpen = () => {
          setOpen(true);
        };

        const handleDrawerClose = () => {
          setOpen(false);
        };

    return (
      <div className={classes.root}>
        <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <MainComponents/>
      </div>
    );
}