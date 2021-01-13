import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import EditSubProductDialog from "./components/EditSubProductDialog";
import { Divider } from "@material-ui/core";

const useTableStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
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

function EnhancedTable(props) {
  const classes = useTableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TableContainer>
        <Divider />
        <Table
          aria-labelledby="tableTitle"
          size={"small"}
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">ชื่อ</TableCell>
              <TableCell align="right">ราคา&nbsp;(บาท)</TableCell>
              <TableCell align="right">จำนวนคงเหลือ&nbsp;(ชิ้น)</TableCell>
              <TableCell align="right">ขายแล้ว&nbsp;(ชิ้น)</TableCell>
              <TableCell align="right">
                จำนวนสั่งซื้อทั้งหมด&nbsp;(ชิ้น)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.Name}>
                    <TableCell>{row.Name}</TableCell>
                    <TableCell align="right">{row.Price}</TableCell>
                    <TableCell align="right">{row.Stock}</TableCell>
                    <TableCell align="right">{row.Sold}</TableCell>
                    <TableCell align="right">{row.Order}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  table: {},
  paper: {
    width: "100%",
    height: "400px",
  },
  headDetail: {
    marginTop: 0,
    paddingLeft: "10px",
    paddingTop: "10px",
  },
  inline_left: {
    display: "inline-block",
    float: "left",
  },
  inline_right: {
    display: "inline-block",
    float: "right",
    padding: "0px 5px",
  },
  inline: {
    display: "inline-block",
  },
  subproduct_head: {
    paddingTop: "2%",
    paddingBot: "2%",
  },
}));

export default function ProductDetail(props) {
  const classes = useStyles();
  const subProductArray = props.SubProduct.length > 0 ? [...props.SubProduct] : null;
  const [openEditSubProduct, setOpenEditSubProduct] = React.useState(false);
  const handleClickOpen = (callback) => {
    callback(true);
  };

  const handleClose = (callback) => {
    callback(false);
  };

  return (
    <Paper className={classes.paper}>
      <div style={{ width: "100%" }}>
        <div id="subproduct_header" className={classes.subproduct_head}>
          <div className={classes.inline_left}>
            <h4 className={classes.headDetail}>
              รายการสินค้าย่อย (Sub-Product)
            </h4>
          </div>
          <div className={classes.inline_right}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              onClick={handleClickOpen.bind(this, setOpenEditSubProduct)}
            >
              เพิ่มสินค้าย่อย
              <ControlPointIcon /> / แก้ไขสินค้าย่อย
              <EditIcon />
            </Button>
            <EditSubProductDialog
              handleEditSubProduct={props.handleEditSubProduct}
              product={subProductArray}
              open={openEditSubProduct}
              handleClose={handleClose.bind(this, setOpenEditSubProduct)}
            />
          </div>
        </div>
      </div>

      <EnhancedTable rows={props.product.SubProduct} />
    </Paper>
  );
}
