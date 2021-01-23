import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import ProductDetail from "./ProductDetail";

const style = {
  paper1: {
    backgroundColor: "rgb(255,255,255)",
    marginTop:"1%"
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
    marginTop:"1%"
  },
};

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_detail: {
        id: null,
        Name: "",
        Description: "",
        Category: "",
        Price: 0,
        Stock: 0,
        Sold: 0,
        Order: 0,
        SubProduct: [],
        Picture: [],
        CreatedOn: null,
        ModifiedOn: null,
        editHistory: [],
      },
    };
  }

  getProductDetailData = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var response_data = JSON.parse(xhttp.responseText);
        this.setState({
          product_detail: response_data,
        });
      }
    };
    xhttp.open("GET", "/productdetail_mockups/product_detail.json", true);
    xhttp.send();
  };

  componentDidMount() {
    const path = window.location.pathname;
    // this.setState({
    //   product_id: path.split("/product/productdetail/")[1],
    // });
    this.getProductDetailData();
  }
  render() {
    return (
      <div>
        <BreadCrumbs
          before={[
            { href: "/dashboard", name: "หน้าแรก" },
            { href: "/product", name: "รายการสินค้า" },
          ]}
          presentpage={"ข้อมูลสินค้า ID : " + this.state.product_detail.id}
        />
        <Paper style={style.paper1}>
          <div style={style.mainDetail}>
            <h2 style={style.headerMain}>ข้อมูลสินค้า</h2>
          </div>

          <Grid container>
            <Grid item xs={7}>
              <ProductDetail />
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default ProductDetailContainer;
