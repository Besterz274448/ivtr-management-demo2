import React, { useState } from "react";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import MainComponents from "./components/MainComponents";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router} from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TvIcon from "@material-ui/icons/Tv";
import ReceiptIcon from "@material-ui/icons/Receipt";
import FlagIcon from "@material-ui/icons/Flag";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function RouteContainer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const sideBarIcon = [
  { icon: DashboardIcon, text: "สรุปผล", path: "/dashboard" },
  { icon: StoreMallDirectoryIcon, text: "รายการสินค้า", path: "/product" },
  { icon: ShoppingCartIcon, text: "รายการคำสั่งซื้อ", path: "/order" },
  { icon: TvIcon, text: "ไลฟ์สด", path: "/livestream" },
  { icon: FlagIcon, text: "แคมเปญ", path: "/campaign" },
  { icon: NotificationsActiveIcon, text: "โปรโมชั่น", path: "/promotion" },
  { icon: ReceiptIcon, text: "รายงาน", path: "/report" },
  { icon: PersonAddIcon, text: "รายชื่อผู้ติดต่อ", path: "/contact" },
  { icon: SettingsIcon, text: "ตั้งค่า", path: "/setting" },
];


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
          sideBarIcon={sideBarIcon}
        />
        <MainComponents />
      </div>
    </Router>
  );
}
