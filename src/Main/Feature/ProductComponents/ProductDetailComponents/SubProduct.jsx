import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  table: {},
  header: {
    padding: "10px 5px",
  },
  boxInline: {
    display: "inline-block",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Paper className={classes.header}>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <h3 className={classes.boxInline}>รายการสินค้าย่อย (SubProduct)</h3>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.boxInline}
              variant="contained"
              color="primary"
              size="small"
            >
              + เพิ่มสินค้าย่อย
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.boxInline}
              variant="contained"
              color="primary"
              size="small"
            >
              + เพิ่มสินค้าย่อย
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Table className={classes.table} size="small" aria-label="simple table">
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
