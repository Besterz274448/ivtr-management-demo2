import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import UploadImage from "./UploadImage";
import ProductAddMainForm from "./ProductAddMainForm";
import ProductAddSubForm from "./ProductAddSubForm";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import SaveIcon from '@material-ui/icons/Save';
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  paper1: {
    backgroundColor: "rgb(255,255,255)",
  },
  paper2: {
    backgroundColor: "rgb(255,255,255)",
    marginTop: "1%",
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
  subDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const handleUploadClick = (event) => {
  var file = event.target.files[0];
  const reader = new FileReader();
  var url = reader.readAsDataURL(file);
  reader.onloadend = function (e) {
    console.log(reader.result);
  }.bind(this);

  // this.setState({
  //   mainState: "uploaded",
  //   selectedFile: event.target.files[0],
  //   imageUploaded: 1,
  // });
};

export default function ProductAdd() {
  const classes = useStyles();
  const [subProduct,setSubProduct] = React.useState([]);

  const addNewSubProduct = ()=>{
    const temp = [...subProduct]
    temp.push({name:"",price:"",stock:"",weight:""});
    setSubProduct(temp);
  }
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
          <h2 className={classes.headerMain}>ข้อมูลสินค้า</h2>
        </div>
        <Grid container>
          <Grid item xs={7}>
            <ProductAddMainForm />
          </Grid>
          <Grid item xs={5}>
            <UploadImage handleImage={handleUploadClick} />
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.mainDetail}>
          <ListItem className={classes.subDiv}>
            <h2 className={classes.headerMain}>ข้อมูลสินค้าย่อย</h2>
            <div>
                <Button variant="contained" color="primary" style={{marginRight:"35px"}} onClick={addNewSubProduct}>
                  <AddCircleRoundedIcon />
                  เพิ่มสินค้าย่อย
                </Button>
                <Button variant="contained" color="secondary">
                  <SaveIcon />
                  บันทึกข้อมูล
                </Button>
            </div>
          </ListItem>
        </div>
        <Grid container>
          <Grid item xs={12}>
            <ProductAddSubForm rows={subProduct} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
