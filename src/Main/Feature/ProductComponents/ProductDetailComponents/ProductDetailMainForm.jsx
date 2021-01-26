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
  inputText: {
    color: "rgb(70,70,70)",
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
  const [changed, setChanged] = React.useState(false);
  const [data, setData] = React.useState({
    product_id: "props.data.product_id",
    product_name: "props.data.product_name",
    product_category: "props.data.product_category",
    product_price: 0,
    product_weight: 0,
    product_stock: 0,
  });

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <>
      <div className={classes.boxInput}>
        <TextField
          className={classes.inputForm}
          label="รหัสสินค้า"
          style={{ margin: 8 }}
          value={data.product_id}
          onChange={(event) => {
            let update = { ...data };
            update.product_id = event.target.value;
            setData(update);
            setChanged(true);
          }}
          onBlur={(event) => {
            if (changed) {
              props.handleData(event.target.value, "product_id");
              setChanged(false);
            }
          }}
          helperText="รหัสสินค้าต้องมีความยาวไม่เกิน 25 ตัวอักษร"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.inputText,
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.boxInput}>
        <TextField
          className={classes.inputForm}
          label="ชื่อสินค้า"
          style={{ margin: 8 }}
          value={data.product_name}
          onChange={(event) => {
            let update = { ...data };
            update.product_name = event.target.value;
            setData(update);
            setChanged(true);
          }}
          onBlur={(event) => {
            if (changed) {
              props.handleData(event.target.value, "product_id");
              setChanged(false);
            }
          }}
          helperText="ชื่อสินค้าต้องมีความยาวมากกว่า 5 ตัวอักษร"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.inputText,
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.boxInput}>
        <TextField
          className={classes.inputForm}
          label="ประเภทสินค้า"
          style={{ margin: 8 }}
          value={data.product_category}
          onChange={(event) => {
            let update = { ...data };
            update.product_category = event.target.value;
            setData(update);
            setChanged(true);
          }}
          onBlur={(event) => {
            if (changed) {
              props.handleData(event.target.value, "product_category");
              setChanged(false);
            }
          }}
          helperText="กรุณากรอกประเภทสินค้าให้ตรงกับประเภทที่คุณต้องการจัดเก็บ"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.inputText,
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.boxInputInline}>
        <TextField
          className={classes.inputInline}
          type="number"
          label="ราคาสินค้า"
          style={{ margin: 8 }}
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.inputText,
          }}
          variant="outlined"
          value={data.product_price}
          onChange={(event) => {
            let update = { ...data };
            update.product_price = event.target.value;
            setData(update);
            setChanged(true);
          }}
          onBlur={(event) => {
            if (changed) {
              props.handleData(event.target.value, "product_price");
              setChanged(false);
            }
          }}
        />
        <TextField
          className={classes.inputInline}
          type="number"
          label="น้ำหนักสินค้า"
          style={{ margin: 8 }}
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.inputText,
          }}
          variant="outlined"
          value={data.product_weight}
          onChange={(event) => {
            let update = { ...data };
            update.product_weight = event.target.value;
            setData(update);
            setChanged(true);
          }}
          onBlur={(event) => {
            if (changed) {
              props.handleData(event.target.value, "product_weight");
              setChanged(false);
            }
          }}
        />
        <TextField
          className={classes.inputInline}
          type="number"
          label="จำนวนสินค้า"
          style={{ margin: 8 }}
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.inputText,
          }}
          variant="outlined"
          value={data.product_stock}
          onChange={(event) => {
            let update = { ...data };
            update.product_stock = event.target.value;
            setData(update);
            setChanged(true);
          }}
          onBlur={(event) => {
            if (changed) {
              props.handleData(event.target.value, "product_stock");
              setChanged(false);
            }
          }}
        />
      </div>
    </>
  );
}
