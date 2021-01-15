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
  { id: "no", label: "NO.",width:"2%" },
  { id: "name", label: "ชื่อสินค้า",width:"20" },
  { id: "edit", label: "ข้อมูล",width:"10%" },
  { id: "oldValue", label: "ค่าเดิม",width:"20%" },
  { id: "newValue", label: "ค่าใหม่ (ผลต่าง)",width:"20%" },
  { id: "date", label: "เวลาที่แก้ไข",width:"15%" },
  { id: "user", label: "ชื่อผู้แก้ไข",width:"15%" },
];

const numericProduct = ["Price", "Weight", "Stock"];

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "2%",
  },
  container: {
    maxHeight: 1000,
  },
  header: {
    padding: "10px 5px",
  },
});

export default function StickyHeadTable(props) {
  const rows = props.product.editHistory;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
                  style={{ width: column.width}}
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
                const itemKey = [];
                for (let key in row.editedItem) {
                    itemKey.push(key);
                }
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {row.type.id === "main" ? "Main" : `สินค้าย่อย \n(${row.type.subName})`}
                    </TableCell>
                    <TableCell align="left">
                      {itemKey.map((data, index) => {
                        return (
                          <TableRow key={data}>
                            <TableCell style={{padding:0}}>{data}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {itemKey.map((data, index) => {
                        return (
                          <TableRow key={row.oldItemValue[data] + index}>
                            <TableCell style={{padding:0}}>{row.oldItemValue[data]}</TableCell>
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
                                <TableCell style={{padding:0}}>
                                  {row.editedItem[data]} (
                                  {row.editedItem[data] -
                                    row.oldItemValue[data] >=
                                  0
                                    ? "+"
                                    : false}
                                  {row.editedItem[data] -
                                    row.oldItemValue[data]}
                                  )
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableRow key={data}>
                                <TableCell style={{padding:0}}>{row.editedItem[data]}</TableCell>
                              </TableRow>
                            )}
                          </TableRow>
                        );
                      })}
                    </TableCell>

                    <TableCell align="left">{row.modifiedDate}</TableCell>
                    <TableCell align="left">{row.user}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
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
