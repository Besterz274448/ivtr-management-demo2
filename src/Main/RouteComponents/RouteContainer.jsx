import React, { useState } from "react";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import MainComponents from "./components/MainComponents";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function RouteContainer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar
          open={open}
          handleDrawerClose={handleDrawerClose}
        />
        <MainComponents/>
      </div>
    </Router>
  );
}
