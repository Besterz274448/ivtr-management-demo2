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

const useStyles = makeStyles((theme) => ({
  table: {
    width: "97%",
    marginLeft: "2%",
  },
  thHead: {
    color: "rgb(240,240,240)",
    fontSize: "13px",
    fontWeight: "bold",
    borderRight: "1px solid rgb(210,210,210)",
    borderLeft: "1px solid rgb(210,210,210)",
  },
  tdCell: {
    padding: 0,
    borderRight: "1px solid rgb(210,210,210)",
    borderLeft: "1px solid rgb(210,210,210)",
  },
  tdNumber: {
    color: "rgb(150,150,150)",
    fontWeight: "bold",
  },
  thRow: {
    backgroundColor: "rgb(105,105,255)",
  },
  textfieldBox1: {
    boxSizing: "border-box",
    height: "100%",
    textAlign: "center",
    color: "rgb(70,70,70)",
  },
  textfieldBox2: {
    boxSizing: "border-box",
    height: "100%",
    textAlign: "center",
  },
}));

const headerTable = [
  { id: "ชื่อสินค้าย่อย", align: "center", width: "25%" },
  { id: "ราคาสินค้า(บาท)", align: "center", width: "10%" },
  { id: "จำนวนสินค้า(ชิ้น)", align: "center", width: "10%" },
  { id: "น้ำหนักสินค้า(กิโลกรัม)", align: "center", width: "15%" },
  { id: "ขายแล้ว", align: "center", width: "10%" },
  { id: "จำนวนสั่งซื้อทั้งหมด", align: "center", width: "15%" },
];

export default function ProductDetailSubForm(props) {
  const classes = useStyles();
  const [subData, setSubData] = React.useState([]);
  const [changed, setChanged] = React.useState(false);

  React.useEffect(() => {
    setSubData(props.data);
  }, [props.data]);

  return (
    <>
      <TableContainer component={Paper} style={{ paddingBottom: "50px" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.thRow}>
              <TableCell className={classes.thHead} width="2%">
                No.
              </TableCell>
              {headerTable.map((data) => {
                return (
                  <TableCell
                    className={classes.thHead}
                    key={data.id}
                    align={data.align}
                    width={data.width}
                  >
                    {data.id}
                  </TableCell>
                );
              })}
              <TableCell
                align={"center"}
                className={classes.thHead}
                width="10%"
              >
                ลบสินค้าย่อย
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell
                  component="td"
                  scope="row"
                  className={classes.tdNumber}
                >
                  {index + 1}
                </TableCell>
                <TableCell align="center" className={classes.tdCell}>
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    required
                    defaultValue={row.Name}
                    style={{ width: "80%" }}
                    onChange={() => {
                      if (!changed) {
                        setChanged(!changed);
                      }
                    }}
                    onBlur={(event) => {
                      if (changed) {
                        props.handleSubProduct(
                          event.target.value,
                          index,
                          "Name"
                        );
                      }
                    }}
                    inputProps={{ className: classes.textfieldBox1 }}
                  />
                </TableCell>
                <TableCell align="center" className={classes.tdCell}>
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    type="number"
                    required
                    defaultValue={row.Price}
                    style={{ width: "80%" }}
                    onChange={() => {
                      if (!changed) {
                        setChanged(!changed);
                      }
                    }}
                    onBlur={(event) => {
                      if (changed) {
                        props.handleSubProduct(
                          event.target.value,
                          index,
                          "Price"
                        );
                      }
                    }}
                    inputProps={{ className: classes.textfieldBox1 }}
                  />
                </TableCell>
                <TableCell align="center" className={classes.tdCell}>
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    type="number"
                    required
                    defaultValue={row.Stock}
                    style={{ width: "80%" }}
                    onChange={() => {
                      if (!changed) {
                        setChanged(!changed);
                      }
                    }}
                    onBlur={(event) => {
                      if (changed) {
                        props.handleSubProduct(
                          event.target.value,
                          index,
                          "Stock"
                        );
                      }
                    }}
                    inputProps={{ className: classes.textfieldBox1 }}
                  />
                </TableCell>
                <TableCell align="center" className={classes.tdCell}>
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    type="number"
                    required
                    defaultValue={row.Weight}
                    style={{ width: "80%" }}
                    onChange={() => {
                      if (!changed) {
                        setChanged(!changed);
                      }
                    }}
                    onBlur={(event) => {
                      if (changed) {
                        props.handleSubProduct(
                          event.target.value,
                          index,
                          "Weight"
                        );
                      }
                    }}
                    inputProps={{ className: classes.textfieldBox1 }}
                  />
                </TableCell>
                <TableCell align="center" className={classes.tdCell}>
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    type="number"
                    style={{ width: "80%" }}
                    disabled
                    defaultValue={row.Sold}
                    inputProps={{ className: classes.textfieldBox2 }}
                  />
                </TableCell>
                <TableCell align="center" className={classes.tdCell}>
                  <TextField
                    size="small"
                    variant="outlined"
                    color="primary"
                    type="number"
                    style={{ width: "80%" }}
                    disabled
                    defaultValue={row.Order}
                    inputProps={{ className: classes.textfieldBox2 }}
                  />
                </TableCell>
                <TableCell align="center" className={classes.tdCell}>
                  <DeleteIcon
                    onClick={() => {
                      props.deleteSubProduct(row.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
