import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  headerLabel: {
    marginLeft: "1%",
    color: "rgb(150,150,150)",
  },
  clearPadding: {
    padding: 0,
    margin: 0,
  },
  inputForm: {
    width: "97%",
  },
  container: {
    width: "100%",
    backgroundColor: "rgb(240,240,240)",
    padding: "1% 2%",
  },
}));

export default function DialogSaleChannel(props) {

  const classes = useStyles();
  return (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <ListItem className={classes.clearPadding}>
            <img src={props.imageChannel} alt="sale_channel" width="30px" />
            <Typography className={classes.headerLabel} variant="h5">
              {props.nameChannel}
            </Typography>
          </ListItem>
        </DialogTitle>
        <DialogContent className={classes.clearPadding}>
          <div className={classes.container}>
            <Typography
              style={{
                color: "rgb(150,150,150)",
              }}
            >
              ข้อมูลสินค้า
            </Typography>
          </div>
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
          <TextField
            className={classes.inputForm}
            label="รายละเอียดสินค้า"
            style={{ margin: 8 }}
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <div className={classes.container}>
            <Typography
              style={{
                color: "rgb(150,150,150)",
              }}
            >
              รายละเอียดช่องทางการขาย
            </Typography>
          </div>
          <TextField
            className={classes.inputForm}
            label="ลิงค์ร้านค้า"
            style={{ margin: 8 }}
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            className={classes.inputForm}
            label="อีเมลล์ร้านค้า"
            style={{ margin: 8 }}
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <div className={classes.container}>
            <Typography
              style={{
                color: "rgb(150,150,150)",
              }}
            >
              การเชื่อมต่อ
            </Typography>
          </div>
          <ListItem>
            <label className={classes.headerLabel}>เชื่อมต่อสต็อค : </label>
            <RadioGroup
              style={{marginLeft:"1%"}}
              row
              aria-label="position"
              name="position"
              defaultValue="เปิด"
            >
              <FormControlLabel
                value="เปิด"
                control={<Radio color="primary" />}
                label="เปิด"
                labelPlacement="end"
              />
              <FormControlLabel
                value="ปิด"
                control={<Radio color="primary" />}
                label="ปิด"
                labelPlacement="end"
              />
            </RadioGroup>
          </ListItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
