import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import UploadImage from "./UploadImage";
import ProductAddMainForm from "./ProductAddMainForm";
import ProductAddSubForm from "./ProductAddSubForm";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import AddSaleChannel from "./AddSaleChannel";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import SaveIcon from "@material-ui/icons/Save";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  paper1: {
    backgroundColor: "rgb(255,255,255)",
  },
  mainDetail: {
    width: "100%",
    margin: 0,
    padding: "1% 0%",
    color: "rgb(80,80,80)",
  },
  headerMain: {
    margin: 0,
    padding: 0,
    marginLeft: "1%",
  },
  subDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function ProductAdd() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [progress, setProgress] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    severity: "success",
    message: "เพิ่มสินค้าสำเร็จ ! ",
  });
  const [data, setData] = React.useState({
    product_id: "",
    product_name: "",
    product_category: "",
    product_price: undefined,
    product_weight: undefined,
    product_stock: undefined,
    product_description: "",
    product_image: [],
    product_subItems: [],
  });
  const [image, setImage] = React.useState([]);
  const [subProduct, setSubProduct] = React.useState([]);

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = async function (e) {
      await setImage([...image, reader.result]);
    };
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addNewSubProduct = () => {
    const temp = [...subProduct];
    temp.push({ name: "", price: 0.0, stock: 0, weight: 0.0 });
    setSubProduct(temp);
  };

  const showAlert = (sev, mes) => {
    let warning = { severity: sev, message: mes };
    setAlertMessage(warning);
    setProgress(true);
    setTimeout(() => {
      setProgress(false);
    }, 3000);
  };

  const createProduct = (e) => {
    e.preventDefault();
    console.log('pass');
    data.product_image = image;
    data.product_subItems = subProduct;
    console.log(data);
    //sending data to backend

    //if success
    showAlert("success", "เพิ่มสินค้าสำเร็จ");
  };

  const handleSubdata = (value, index, type) => {
    let items = [...subProduct];
    items[index][type] = value;
    setSubProduct(items);
  };

  const handleData = (value, tag) => {
    let items = { ...data };
    items[tag] = value;
    setData(items);
  };

  return (
    <>
      <BreadCrumbs
        before={[
          { href: "/dashboard", name: "home" },
          { href: "/product", name: "รายการสินค้า" },
        ]}
        presentpage="เพิ่มสินค้า"
      />
      <Paper className={classes.paper1}>
        <div className={classes.mainDetail}>
          {!progress ? (
            <ListItem className={classes.subDiv}>
              <h2 className={classes.headerMain}>ข้อมูลสินค้า</h2>
              <Button
                type="submit"
                form="add_product_form"
                variant="contained"
                color="secondary"
              >
                <SaveIcon />
                บันทึกข้อมูล
              </Button>
            </ListItem>
          ) : (
            <Alert severity={alertMessage.severity}>
              {alertMessage.message}
            </Alert>
          )}
        </div>
        <form id="add_product_form" onSubmit={createProduct}>
          <Grid container style={{ paddingBottom: "2%" }}>
            <Grid item xs={7}>
              <ProductAddMainForm data={data} handleData={handleData} />
            </Grid>
            <Grid item xs={5}>
              <UploadImage
                image={image}
                description={data.product_description}
                handleData={handleData}
                handleImage={handleUploadClick}
              />
            </Grid>
          </Grid>
          <Divider />
          <div className={classes.mainDetail}>
            <ListItem className={classes.subDiv}>
              <h2 className={classes.headerMain}>ช่องทางการขาย</h2>
              <div>
                {/* <Button
                variant="contained"
                color="primary"
                onClick={handleExpandClick}
                aria-expanded={expanded}
              >
                <AddCircleRoundedIcon />
                เพิ่มช่องทางการขาย
              </Button> */}
              </div>
            </ListItem>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <AddSaleChannel />
            </Collapse>
          </div>
          <Divider />
          <div className={classes.mainDetail}>
            <ListItem className={classes.subDiv}>
              <h2 className={classes.headerMain}>ข้อมูลสินค้าย่อย</h2>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addNewSubProduct}
                >
                  <AddCircleRoundedIcon />
                  เพิ่มข้อมูลสินค้าย่อย
                </Button>
              </div>
            </ListItem>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <ProductAddSubForm
                rows={subProduct}
                handleSubdata={handleSubdata}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
