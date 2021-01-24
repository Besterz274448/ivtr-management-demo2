import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import UploadImage from "./UploadImage";
import ProductDetailMainForm from "./ProductDetailMainForm";
import ProductDetailSubForm from "./ProductDetailSubForm";
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
  const [subProduct,setSubProduct] = React.useState([]);
  const [image, setImage] = React.useState([]);
  const [data, setData] = React.useState({
    product_id: "",
    product_name: "",
    product_description: "",
    product_category: "",
    product_weight: 0,
    product_price: 0,
    product_stock: 0,
    product_sold: 0,
    product_order: 0,
    product_subItems: [],
    product_image: null,
    product_createOn: null,
    product_modifiedOn: null,
    product_edit_history: [],
  });
  const [oldData, setOldData] = React.useState({
    product_id: null,
    product_name: "",
    product_description: "",
    product_category: "",
    product_weight: 0,
    product_price: 0,
    product_stock: 0,
    product_sold: 0,
    product_order: 0,
    product_subItems: [],
    product_image: null,
    product_createOn: null,
    product_modifiedOn: null,
    product_edit_history: [],
  });

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = async function (e) {
      await setImage([...image, reader.result]);
    };
  };

  React.useEffect(()=>{
    const path = window.location.pathname;
    // this.setState({
    //   product_id: path.split("/product/productdetail/")[1],
    // });
    getProductDetailData();
  },[]);


  const getProductDetailData = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var response_data = JSON.parse(xhttp.responseText);
        setOldData(response_data);
        setData(response_data);
        setSubProduct(JSON.parse(JSON.stringify(response_data.product_subItems)));
      }
    };
    xhttp.open("GET", "/productdetail_mockups/product_detail.json", true);
    xhttp.send();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addNewSubProduct = () => {
    let newData = {
      Name:"",
      Price:0,
      Stock:0,
      Weight:0,
      Sold:0,
      Order:0
    }
    let temp = [...subProduct,newData];
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

  const handleData = (value, tag) => {
    let items = { ...data };
    items[tag] = value;
    setData(items);
  };


  return (
    <>
      <BreadCrumbs
        before={[
          { href: "/dashboard", name: "หน้าแรก" },
          { href: "/product", name: "รายการสินค้า" },
        ]}
        presentpage={"ข้อมูลสินค้า ID : " + data.product_id}
      />
      <Paper className={classes.paper1}>
        <div className={classes.mainDetail}>
          {!progress ? (
            <ListItem className={classes.subDiv}>
              <h2 className={classes.headerMain}>ข้อมูลสินค้า</h2>
              <Button
                type="submit"
                form="edit_product_form"
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
        <Grid container style={{ paddingBottom: "2%" }}>
          <Grid item xs={7}>
            <form id="edit_product_form">
              <ProductDetailMainForm data={data} handleData={handleData}/>
            </form>
          </Grid>
          <Grid item xs={5}>
            <UploadImage image={data.product_image} handleImage={handleUploadClick} handleData={handleData} description={data.product_description} />
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
            <ProductDetailSubForm data={subProduct} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
