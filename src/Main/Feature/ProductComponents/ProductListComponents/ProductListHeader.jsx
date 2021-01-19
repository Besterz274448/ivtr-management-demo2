import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
  marginBox: {
    marginRight: "0.5%",
  },
}));

const numeric_record = ["Price", "Stock", "Sold"];

const filterLabel = [
  { id: "id", label: "รหัสสินค้า" },
  { id: "Name", label: "ชื่อสินค้า" },
  { id: "Price", label: "ราคา" },
  { id: "Stock", label: "คงเหลือ" },
  { id: "Sold", label: "ขายแล้ว" },
  { id: "Category", label: "ประเภท" },
];

const mathLabel = [
  { id: ">", label: ">" },
  { id: "<", label: "<" },
  { id: "=", label: "=" },
  { id: "[]", label: "ระหว่าง" },
];

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
        <Typography className={classes.marginBox}>
          อัพเดทล่าสุด : {props.date}
        </Typography>
      </ListItem>
      <ListItem>
        <Typography className={classes.textSub}>
          รายการสินค้าทั้งหมด {props.dataLength} รายการ
        </Typography>
        <Typography
          variant="inherit"
          style={{ marginLeft: "auto", marginRight: "0.5%" }}
          className={classes.textSub}
        >
          <FilterBox
            data={filterLabel}
            maxWidth={120}
            minWidth={120}
            filterSelected={props.filter_selected}
            type={"filter_selected"}
            handleChangeSelected={props.handleChangeSelected}
          />
        </Typography>
        <Typography
          variant="inherit"
          className={classes.textSub}
          style={{ marginRight: "0.5%" }}
        >
          {numeric_record.indexOf(props.filter_selected) !== -1 && (
            <FilterBox
              data={mathLabel}
              maxWidth={100}
              filterSelected={props.operator_selected}
              type={"operator_selected"}
              handleChangeSelected={props.handleChangeSelected}
            />
          )}
        </Typography>
        <div className={classes.marginBox} style={{ width: 200 }}>
          <Autocomplete
            clearOnBlur={false}
            id="product_search_min_range"
            clearText
            value={props.defaultSearch}
            options={props.filter_data.map((option) => option + "")}
            onInputChange={(event, values) => {
              props.handleChangeTextfield(values);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                type={
                  numeric_record.indexOf(props.filter_selected) !== -1
                    ? "number"
                    : "text"
                }
                label="SearchBox"
                size="small"
                variant="outlined"
              />
            )}
          />
        </div>
        {props.operator_selected === "[]" &&
          numeric_record.indexOf(props.filter_selected) !== -1 && (
            <React.Fragment>
              <span className={classes.marginBox}>ถึง</span>
              <div className={classes.marginBox} style={{ width: 200 }}>
                <Autocomplete
                  clearOnBlur={false}
                  id="product_search_max_range"
                  clearText
                  value={props.defaultSearch}
                  options={props.filter_data.map((option) => option + "")}
                  onInputChange={(event, values) => {
                    props.handleChangeTextfield(values);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      type={
                        numeric_record.indexOf(props.filter_selected) !== -1
                          ? "number"
                          : "text"
                      }
                      label="SearchBox"
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </React.Fragment>
          )}
      </ListItem>
    </div>
  );
}

