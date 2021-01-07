import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ShowChartRoundedIcon from "@material-ui/icons/ShowChartRounded";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

const textfieldBox = {
  marginTop: "3%",
  width: "90%",
  marginRight: "auto",
  marginLeft: "auto",
};

const TextFieldstyle90 = {
  width: "90%",
  display: "inline-block",
  verticalAlign: "bottom",
};

const TextFieldstyle80 = {
  width: "80%",
  display: "inline-block",
  verticalAlign: "bottom",
};

const maxWidth = {
  width: "100%",
};

const textAreaBox = {
  marginTop: "2%",
  fontSize: "0.9rem",
  color: "rgb(100,100,100)",
};

const textAreaStyle = {
  width: "93%",
};

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function FormDialog(props) {
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const classes = useStyles();
  let nameRef;
  let priceRef;
  let stockRef;
  let categoryRef;
  let weightRef;
  let descriptionRef;
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          แก้ไขข้อมูลสินค้า
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        {updateSuccess ? (
          <Alert severity="success">แก้ไขข้อมูลสินค้าสำเร็จ ! </Alert>
        ) : (
          false
        )}
        <DialogContent style={{ paddingTop: 0 }}>
          <div style={textfieldBox}>
            <div style={maxWidth}>
              <div style={TextFieldstyle90}>
                <TextField
                  id="input_product_detail_name"
                  inputRef={(ref) => {
                    nameRef = ref;
                  }}
                  label="ชื่อสินค้า"
                  placeholder="กรุณากรอกชื่อสินค้า"
                  defaultValue={props.product.Name}
                  required
                  fullWidth
                  margin="none"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
              </div>
              <label style={{ display: "inline-block", paddingLeft: "1%" }}>
                <LocalOfferRoundedIcon />
              </label>
            </div>
            <Grid container style={{ marginTop: "2%" }}>
              <Grid item xs={6}>
                <div style={maxWidth}>
                  <div style={TextFieldstyle80}>
                    <TextField
                      id="input_product_detail_price"
                      inputRef={(ref) => {
                        priceRef = ref;
                      }}
                      label="ราคาสินค้า"
                      placeholder="กรุณากรอกราคาสินค้า"
                      defaultValue={props.product.Price}
                      required
                      fullWidth
                      type="number"
                      margin="none"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: "บาท",
                      }}
                      variant="standard"
                    />
                  </div>
                  <label style={{ display: "inline-block", paddingLeft: "2%" }}>
                    <MonetizationOnRoundedIcon />
                  </label>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={maxWidth}>
                  <div style={TextFieldstyle80}>
                    <TextField
                      id="input_product_detail_stock"
                      inputRef={(ref) => {
                        stockRef = ref;
                      }}
                      label="จำนวนคงเหลือสินค้า"
                      placeholder="กรุณากรอกจำนวนคงเหลือ"
                      defaultValue={props.product.Stock}
                      required
                      type="number"
                      fullWidth
                      margin="none"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: "ชิ้น",
                      }}
                      variant="standard"
                    />
                  </div>
                  <label style={{ display: "inline-block", paddingLeft: "2%" }}>
                    <ShowChartRoundedIcon />
                  </label>
                </div>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "2%" }}>
              <Grid item xs={6}>
                <div style={maxWidth}>
                  <div style={TextFieldstyle80}>
                    <TextField
                      id="input_product_detail_Category"
                      inputRef={(ref) => {
                        categoryRef = ref;
                      }}
                      label="ประเภทสินค้า"
                      placeholder="กรุณากรอกประเภทสินค้า"
                      defaultValue={props.product.Category}
                      required
                      fullWidth
                      margin="none"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                    />
                  </div>
                  <label style={{ display: "inline-block", paddingLeft: "2%" }}>
                    <CategoryRoundedIcon />
                  </label>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={maxWidth}>
                  <div style={TextFieldstyle80}>
                    <TextField
                      id="input_product_detail_Weight"
                      inputRef={(ref) => {
                        weightRef = ref;
                      }}
                      label="น้ำหนักสินค้า"
                      placeholder="กรุณากรอกน้ำหนักสินค้า"
                      defaultValue={props.product.Weight}
                      required
                      type="number"
                      fullWidth
                      margin="none"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: "KG",
                      }}
                      variant="standard"
                    />
                  </div>
                  <label style={{ display: "inline-block", paddingLeft: "2%" }}>
                    <FitnessCenterIcon />
                  </label>
                </div>
              </Grid>
            </Grid>
            <div style={textAreaBox}>
              <label>รายละเอียดสินค้า</label>
              <TextareaAutosize
                id="input_product_detail_Description"
                ref={(ref) => {
                  descriptionRef = ref;
                }}
                style={textAreaStyle}
                rowsMin={4}
                rowsMax={4}
                aria-label="Description Product"
                placeholder="กรุณากรอกรายละเอียดสินค้า"
                defaultValue={props.product.Description}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              const data = {
                Name: nameRef.value,
                Price: parseFloat(priceRef.value),
                Stock: parseInt(stockRef.value),
                Category: categoryRef.value,
                Weight: parseFloat(weightRef.value),
                Description: descriptionRef.value,
              };
              const updateStatus = await props.handleEditProduct(data);
              if (updateStatus) {
                setUpdateSuccess(true);
                setTimeout(() => {
                  setUpdateSuccess(false);
                }, 3000);
              }
            }}
            variant="contained"
            color="primary"
          >
            แก้ไข
          </Button>
          <Button
            onClick={props.handleClose}
            variant="contained"
            color="secondary"
          >
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
