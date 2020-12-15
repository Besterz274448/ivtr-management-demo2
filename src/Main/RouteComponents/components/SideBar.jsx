import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TvIcon from '@material-ui/icons/Tv';
import ReceiptIcon from '@material-ui/icons/Receipt';
import FlagIcon from '@material-ui/icons/Flag';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { NavLink } from "react-router-dom";

const drawerWidth = 200;

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

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Sidebar({ open, handleDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {sideBarIcon.map((data, index) => (
          <ListItem
            button
            key={data.text}
          >
            <NavLink to={data.path}>
              <ListItemIcon>{<data.icon/>}</ListItemIcon>
            </NavLink>
            <ListItemText primary={data.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
