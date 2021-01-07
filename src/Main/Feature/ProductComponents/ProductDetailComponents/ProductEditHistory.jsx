import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "no", label: "NO." },
  { id: "name", label: "ชื่อสินค้า" },
  { id: "edit", label: "ข้อมูลที่ถูกแก้ไข" },
  { id: "oldValue", label: "ค่าเดิม" },
  { id: "newValue", label: "ค่าใหม่" },
  { id: "date", label: "เวลาที่แก้ไข" },
  { id: "user", label: "ชื่อผู้แก้ไข" },
];

const numericProduct = ["Price", "Weight", "Stock"];

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "2%",
  },
  container: {
    maxHeight: 440,
  },
  header: {
    padding: "10px 5px",
  },
});

export default function StickyHeadTable(props) {
  const nameProduct = props.product.Name;
  const rows = props.product.editHistory;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Paper className={classes.header}>
        <h3>ประวัติการแก้ไขข้อมูลสินค้า (Product Edited History)</h3>
      </Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.tableHeadColor}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  // style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                console.log(row);
                const itemKey = [];
                for (let key in row.editedItem) {
                  itemKey.push(key);
                }
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {row.type.id === "main" ? nameProduct : "subproduct"}
                    </TableCell>
                    <TableCell align="left">
                      {itemKey.map((data, index) => {
                        return (
                          <TableRow key={data}>
                            <React.Fragment>{data}</React.Fragment>
                          </TableRow>
                        );
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {itemKey.map((data, index) => {
                        return (
                          <TableRow key={row.oldItemValue[data] + index}>
                            <React.Fragment>{row.oldItemValue[data]}</React.Fragment>
                          </TableRow>
                        );
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {itemKey.map((data, index) => {
                        return (
                          <TableRow key={row.editedItem[data] + index}>
                            {numericProduct.indexOf(data) !== -1 ? (
                              <TableRow key={data}>
                                <React.Fragment>
                                  {row.editedItem[data]} (
                                  {row.editedItem[data] -
                                    row.oldItemValue[data] >=
                                  0
                                    ? "+"
                                    : "-"}
                                  {row.editedItem[data] -
                                    row.oldItemValue[data]}
                                  )
                                </React.Fragment>
                              </TableRow>
                            ) : (
                              <TableRow key={data}>
                                <React.Fragment>{row.editedItem[data]}</React.Fragment>
                              </TableRow>
                            )}
                          </TableRow>
                        );
                      })}
                    </TableCell>

                    <TableCell align="left">{row.modifiedDate}</TableCell>
                    <TableCell align="center">{row.user}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
