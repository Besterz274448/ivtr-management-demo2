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
      width: "95%",
      display: "flex",
      marginLeft: "2%",
      marginBottom: "1",
      justifyContent: "space-between",
    },
    inputInline: {
      width: "30%",
    },

  }));
export default function ProductAddMainForm(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.boxInput}>
        <TextField
          className={classes.inputForm}
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
          label="ราคาสินค้า"
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
          label="น้ำหนักสินค้า"
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
          label="จำนวนสินค้า"
          style={{ margin: 8 }}
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
          style={{ margin: 8 }}
          label="รายละเอียดสินค้า"
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          rows={4}
          variant="outlined"
        />
      </div>
    </>
  );
}
