import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  headerMain: {
    margin: 0,
    padding: 0,
  },
  inputForm: {
    width: "95%",
  },
  boxInput: {
    marginLeft: "2%",
    marginBottom: "1%",
  },
  boxInputInline: {
    width: "95.3%",
    display: "flex",
    marginLeft: "2%",
    marginBottom: "1",
    justifyContent: "space-between",
  },
  inputInline: {
    width: "30%",
  },
}));
export default function ProductDetailMainForm(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.boxInput}>
        <TextField
          className={classes.inputForm}
          value={props.data.product_id}
          onChange={(event) => {
            props.handleData(event.target.value, "product_id");
          }}
          label="รหัสสินค้า"
          style={{ margin: 8 }}
          helperText="รหัสสินค้าต้องมีความยาวไม่เกิน 25 ตัวอักษร"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.boxInput}>
        <TextField
          className={classes.inputForm}
          label="ชื่อสินค้า"
          value={props.data.product_name}
          onChange={(event) => {
            props.handleData(event.target.value, "product_name");
          }}
          style={{ margin: 8 }}
          helperText="ชื่อสินค้าต้องมีความยาวมากกว่า 5 ตัวอักษร"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.boxInput}>
        <TextField
          className={classes.inputForm}
          label="ประเภทสินค้า"
          value={props.data.product_category}
          onChange={(event) => {
            props.handleData(event.target.value, "product_category");
          }}
          style={{ margin: 8 }}
          helperText="กรุณากรอกประเภทสินค้าให้ตรงกับประเภทที่คุณต้องการจัดเก็บ"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.boxInputInline}>
        <TextField
          className={classes.inputInline}
          type="number"
          label="ราคาสินค้า"
          value={props.data.product_price}
          onChange={(event) => {
            props.handleData(event.target.value, "product_price");
          }}
          style={{ margin: 8 }}
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          className={classes.inputInline}
          type="number"
          label="น้ำหนักสินค้า"
          value={props.data.product_weight}
          onChange={(event) => {
            props.handleData(event.target.value, "product_weight");
          }}
          style={{ margin: 8 }}
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          className={classes.inputInline}
          type="number"
          label="จำนวนสินค้า"
          value={props.data.product_stock}
          onChange={(event) => {
            props.handleData(event.target.value, "product_stock");
          }}
          style={{ margin: 8 }}
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
    </>
  );
}
