import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import SearchIcon from "@material-ui/icons/Search";
import FilterBox from "./FilterBox";

const useHeaderStyles = makeStyles((theme) => ({
  root: {},
  textHeader: {
    fontWeight: "bold",
  },
  textSub: {
    color: "rgb(150,150,150)",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchIcon: {
    color: "rgb(150,150,150)",
  },
  datePos: {
    marginRight: "1%",
  },
}));

export default function ProductListHeader(props) {
  const classes = useHeaderStyles();
  return (
    <div>
      <ListItem className={classes.flexBox}>
        <BreadCrumbs
          before={[{ href: "/dashboard", name: "หน้าแรก" }]}
          presentpage="รายการสินค้า"
        />

      </ListItem>
      <ListItem className={classes.flexBox}>
        <Typography className={classes.textHeader} variant="h6">
          รายการสินค้า
        </Typography>
        <Typography className={classes.datePos}>อัพเดทล่าสุด : {props.date}</Typography>

      </ListItem>
      <ListItem className={classes.flexBox}>
        <Typography className={classes.textSub}>
          รายการสินค้าทั้งหมด {props.dataLength} รายการ
        </Typography>
        <div>
          <ListItem>
            <Tooltip title="Filter list">
              <FilterBox />
            </Tooltip>
            <TextField
              id="outlined-full-width"
              placeholder="SearchBox"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon className={classes.searchIcon} />,
              }}
              variant="outlined"
            />
          </ListItem>
        </div>
      </ListItem>
    </div>
  );
}
