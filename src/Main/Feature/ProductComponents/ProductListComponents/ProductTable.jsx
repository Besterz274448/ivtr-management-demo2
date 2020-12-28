import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterBox from "./FilterBox";
import AutocompleteBox from "./AutocompleteBox";
import { NavLink } from "react-router-dom";
import InputBox from "./InputBox";
import LoadingProgress from "./LoadingProgress";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "รหัสสินค้า",
  },
  {
    id: "Name",
    numeric: false,
    disablePadding: false,
    label: "ชื่อสินค้า",
  },
  { id: "Price", numeric: false, disablePadding: false, label: "ราคา" },
  { id: "Stock", numeric: false, disablePadding: false, label: "คงเหลือ" },
  { id: "Category", numeric: false, disablePadding: false, label: "ประเภท" },
  { id: "Sold", numeric: false, disablePadding: false, label: "ขายแล้ว" },
];

const NumericHeader = ["Price", "Stock", "Sold"];
const NumericOptions = [
  { id: "<", label: "<" },
  { id: ">", label: ">" },
  { id: "=", label: "=" },
  { id: "<>", label: "ระหว่าง" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 50%",
  },
}));

const NavLinkStyle = {
  marginRight: "2.5em",
  textDecoration: "none",
};

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    onChangeFilter,
    filterData,
    onChangeSearchBar,
    filterSelected,
    clearText,
    filterNumeric,
    onSearchDataFromRange,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <span>
            <b>รายการสินค้า</b>
          </span>
          <React.Fragment>
            <div style={{ display: "inline-block", paddingLeft: "30px" }}>
              <div
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                }}
              >
                <FilterBox
                  filterSelected={filterSelected}
                  headCells={headCells}
                  onChangeFilter={onChangeFilter}
                  typeFilter="filterGroup"
                />
              </div>
              {NumericHeader.indexOf(filterSelected) !== -1 ? (
                <div
                  style={{
                    display: "inline-block",
                    verticalAlign: "top",
                    paddingRight: "5px",
                  }}
                >
                  <FilterBox
                    headCells={NumericOptions}
                    filterSelected={filterNumeric}
                    onChangeFilter={onChangeFilter}
                    InputWidth={20}
                    typeFilter="numericGroup"
                  />
                </div>
              ) : (
                false
              )}

              {filterNumeric === "<>" &&
              NumericHeader.indexOf(filterSelected) !== -1 ? (
                <React.Fragment>
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: 11,
                      marginLeft: 10,
                    }}
                  >
                    <InputBox
                      id="product_search_min_range"
                      name="min"
                      onSearchDataFromRange={onSearchDataFromRange}
                    />
                  </div>
                  <span
                    style={{
                      margin: "0px 10px",
                      color: "#9c9c9c",
                      fontSize: "16px",
                    }}
                  >
                    ถึง
                  </span>
                  <div style={{ display: "inline-block", marginTop: 11 }}>
                    <InputBox
                      id="product_search_max_range"
                      name="max"
                      onSearchDataFromRange={onSearchDataFromRange}
                    />
                  </div>
                </React.Fragment>
              ) : (
                <div style={{ display: "inline-block", marginTop: 11 }}>
                  <AutocompleteBox
                    onChangeSearchBar={onChangeSearchBar}
                    filterData={filterData}
                    clearText={clearText}
                  />
                </div>
              )}
            </div>
          </React.Fragment>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <NavLink style={NavLinkStyle} to="/product/addproduct">
          <b>+</b> New Product
        </NavLink>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ showProductDetail }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [filter_selected, setSelectedFilter] = React.useState(headCells[0].id);
  const [filter_numeric, setNumericSelect] = React.useState(
    NumericOptions[0].id
  );
  const [filter_data, setFilterData] = React.useState([]);
  const [full_data, setFullData] = React.useState([]);
  const [clearText, setTextInput] = React.useState(null);
  const [loadingData,setLoadingData] = React.useState(true);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const findDuplicate = (raw_data, filter_id) => {
    var filter = [];
    for (let i = 0; i < raw_data.length; i++) {
      if (filter.indexOf(raw_data[i][filter_id]) === -1) {
        filter.push(raw_data[i][filter_id]);
      }
    }
    return filter;
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  function onChangeFilter(filter_id, type) {
    switch (type) {
      case "filterGroup":
        const filter = findDuplicate(full_data, filter_id);
        setFilterData(filter);
        setSelectedFilter(filter_id);
        break;
      case "numericGroup":
        setNumericSelect(filter_id);
        break;
      default:
        break;
    }
    setPage(0);
    if (
      filter_numeric === "<>" &&
      NumericHeader.indexOf(filter_selected) !== -1
    ) {
      document.getElementById("product_search_min_range").value = "";
      document.getElementById("product_search_max_range").value = "";
    }
    if (rows.length !== full_data.length) {
      setRows([...full_data]);
    }
    setTextInput(clearText == null ? "" : null);
  }

  function searchData(keyword) {
    let selectedData;
    if (NumericHeader.indexOf(filter_selected) !== -1) {
      switch (filter_numeric) {
        case ">":
          selectedData = full_data.filter(
            (data) => data[filter_selected] >= keyword
          );
          break;
        case "<":
          selectedData = full_data.filter(
            (data) => data[filter_selected] <= keyword
          );
          break;
        case "=":
          selectedData = full_data.filter(
            (data) => data[filter_selected] == keyword
          );
          break;
        default:
          break;
      }
    } else {
      keyword = keyword + "";
      let query = keyword.toLowerCase();
      selectedData = full_data.filter(
        (data) => (data[filter_selected] + "").toLowerCase().indexOf(query) >= 0
      );
    }
    return selectedData;
  }

  function onChangeSearchBar(keyword, type) {
    if (type === "search") {
      const data = searchData(keyword);
      setRows([...data]);
    } else if (type === "reset") {
      setRows([...full_data]);
    }
    setPage(0);
  }

  function onSearchDataFromRange(data) {
    var min_value = document.getElementById("product_search_min_range").value;
    var max_value = document.getElementById("product_search_max_range").value;

    if (min_value.length !== 0 && max_value.length !== 0) {
      let selectData = full_data.filter(
        (data) =>
          data[filter_selected] >= min_value &&
          data[filter_selected] <= max_value
      );
      setRows([...selectData]);
      setPage(0);
    }
  }

  function fetchProductData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.responseText);
        const filterData = findDuplicate(data, filter_selected);
        setLoadingData(false);
        setRows([...data]);
        setFullData([...data]);
        setFilterData(filterData);
      }
    };
    xhr.open("GET", "https://ivtr-server.herokuapp.com/product/");
    xhr.send();
  }

  React.useEffect(() => {
    fetchProductData();
  }, []);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onChangeFilter={onChangeFilter}
          filterData={filter_data}
          filterSelected={filter_selected}
          onChangeSearchBar={onChangeSearchBar}
          clearText={clearText}
          filterNumeric={filter_numeric}
          onSearchDataFromRange={onSearchDataFromRange}
        />
        {loadingData ? <LoadingProgress /> : false}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      onClick={() => {
                        showProductDetail(row);
                      }}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => handleClick(event, row.id)}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip title={row.Name}>
                          <Typography>
                            {row.Name.length > 20
                              ? row.Name.slice(0, 20) + "..."
                              : row.Name}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">{row.Price}</TableCell>
                      <TableCell align="left">{row.Stock}</TableCell>
                      <TableCell align="left">{row.Category}</TableCell>
                      <TableCell align="left">{row.Sold}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
