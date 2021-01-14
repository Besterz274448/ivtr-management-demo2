import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  table: {
    width: "95%",
    marginLeft: "2%",
  },
  thHead: {
    color: "rgb(240,240,240)",
    fontSize: "13px",
    fontWeight: "bold",
  },
  tdNumber: {
    color: "rgb(150,150,150)",
    fontWeight: "bold",
  },
  thRow: {
    backgroundColor: "rgb(105,105,255)",

  },
  textfieldBox: {
    boxSizing: "border-box",
    padding:"13px"
  },
}));

const headerTable = [
  { id: "ชื่อสินค้าย่อย", align: "center" },
  { id: "ราคาสินค้า(บาท)", align: "center" },
  { id: "จำนวนสินค้า(ชิ้น)", align: "center" },
  { id: "น้ำหนักสินค้า(กิโลกรัม)", align: "center" },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ProductAddSubForm(props) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper} style={{paddingBottom:"50px"}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.thRow}>
              <TableCell className={classes.thHead}>No.</TableCell>
              {headerTable.map((data, index) => {
                return (
                  <TableCell
                    className={classes.thHead}
                    key={data.id}
                    align={data.align}
                  >
                    {data.id}
                  </TableCell>
                );
              })}
              <TableCell align={"center"} className={classes.thHead}>
                ลบสินค้าย่อย
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  component="td"
                  scope="row"
                  className={classes.tdNumber}
                >
                  {index + 1}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    defaultValue={""}
                    inputProps={{ className: classes.textfieldBox }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    defaultValue={""}
                    inputProps={{ className: classes.textfieldBox }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    defaultValue={""}
                    inputProps={{ className: classes.textfieldBox }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    defaultValue={""}
                    inputProps={{ className: classes.textfieldBox }}
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}