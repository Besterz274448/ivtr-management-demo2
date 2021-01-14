import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BreadCrumps from "./BreadCrumpsAddProduct";
import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "rgb(255,255,255)",
  },
  mainDetail: {
    width: "100%",
    margin: 0,
    padding: "1% 2%",
    color: "rgb(80,80,80)",
  },
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
  uploadBox: {
    display: "none",
  },
}));

const handleUploadClick = (event) => {
  var file = event.target.files[0];
  const reader = new FileReader();
  var url = reader.readAsDataURL(file);

  console.log(url);

  // reader.onloadend = function (e) {
  //   this.setState({
  //     selectedFile: [reader.result],
  //   });
  // }.bind(this);
  // console.log(url); // Would see a path?

  // this.setState({
  //   mainState: "uploaded",
  //   selectedFile: event.target.files[0],
  //   imageUploaded: 1,
  // });
};

export default function ProductAdd() {
  const classes = useStyles();
  return (
    <>
      <BreadCrumps />
      <Paper className={classes.paper}>
        <div className={classes.mainDetail}>
          <h2 className={classes.headerMain}>ข้อมูลสินค้า</h2>
        </div>
        <Grid container>
          <Grid item xs={7}>
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
          </Grid>
          <Grid item xs={5}>
            <div style={{ textAlign: "center" }}>
              <div>
                <img src="https://image.mfa.go.th/mfa/c_c_400x300/umufy3EgqL/migrate_directory/bulletin-20190127-194155.jpg" />
              </div>

              <input
                accept="image/*"
                className={classes.uploadBox}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
              />
              <Button
                color="primary"
                variant="contained"
                style={{ paddingTop: "5px", paddingBottom: "2px" }}
              >
                <label htmlFor="contained-button-file">
                  <span>
                    <AddPhotoAlternateIcon />
                  </span>
                  <span style={{ verticalAlign: "top" }}>อัพโหลดรูปภาพ</span>
                </label>
              </Button>
              <p>สามารถอัพโหลดรูปภาพได้จำนวนสูงสุด 4 รูปภาพ</p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
