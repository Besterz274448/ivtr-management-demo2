import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [subproduct, setSubProduct] = React.useState(null);

  React.useEffect(() => {
    if(props.product != null){
      setSubProduct([...props.product]);
    }
  },[props.product]);

  const editSubProduct = (index, type, value) => {
    var newData = JSON.parse(JSON.stringify(subproduct));
    newData[index][type] = value;
    setSubProduct(newData);
  };

  const addNewProduct = () => {
    const newData = { Name: "", Price: 0, Stock: 0, Sold: 0, Order: 0 };
    const newSubProduct = [...subproduct, newData];
    setSubProduct(newSubProduct);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              แก้ไขข้อมูลสินค้าย่อย
            </Typography>
            <Button
              autoFocus
              color="primary"
              className={classes.button}
              variant="contained"
              onClick={addNewProduct}
            >
              <AddCircleIcon />
              เพิ่มสินค้าย่อย
            </Button>
            <Button
              autoFocus
              color="primary"
              className={classes.button}
              variant="contained"
              onClick={() => {
                props.handleEditSubProduct(subproduct);
              }}
            >
              <SaveIcon /> บันทึก
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {subproduct != null? subproduct.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <ListItem style={{ justifyContent: "space-between" }}>
                  <label>NO.{index + 1}</label>
                  <TextField
                    id={"subproduct_name" + index}
                    label="ชื่อสินค้าย่อย"
                    style={{ margin: 8 }}
                    placeholder="ชื่อสินค้าย่อย"
                    defaultValue={data.Name}
                    onChange={(event) => {
                      editSubProduct(index, "Name", event.target.value);
                    }}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    id={"subproduct_price" + index}
                    label="ราคา"
                    style={{ margin: 8 }}
                    placeholder="ราคาสินค้าย่อย"
                    defaultValue={data.Price}
                    type="number"
                    onChange={(event) => {
                      editSubProduct(index, "Price", event.target.value);
                    }}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    id={"subproduct_stock" + index}
                    label="จำนวนคงเหลือ"
                    style={{ margin: 8 }}
                    placeholder="จำนวนคงเหลือ"
                    type="number"
                    onChange={(event) => {
                      editSubProduct(index, "Stock", event.target.value);
                    }}
                    defaultValue={data.Stock}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />{" "}
                  <TextField
                    id={"subproduct_sold" + index}
                    label="ขายแล้ว"
                    style={{ margin: 8 }}
                    disabled
                    placeholder="ขายแล้ว"
                    defaultValue={data.Sold}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    id={"subproduct_order" + index}
                    label="จำนวนสั่งซื้อทั้งหมด"
                    defaultValue={data.Order}
                    disabled
                    style={{ margin: 8 }}
                    placeholder="จำนวนสั่งซื้อทั้งหมด"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          }) : false}
        </List>
      </Dialog>
    </div>
  );
}
