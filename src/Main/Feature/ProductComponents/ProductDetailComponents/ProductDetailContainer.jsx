import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import ProductEditHistory from "./ProductEditHistory";
import { formatDate } from "../../../Helpers/date";

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sale_history: [],
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
      imageNumber: 0,
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

  handleEditProduct = (item) => {
    let newData = {};
    let oldData = {};
    let changed = false;
    for (let key in item) {
      if (item[key] !== this.state.product_detail[key]) {
        newData[key] = item[key];
        oldData[key] = this.state.product_detail[key];
        changed = true;
      }
    }

    if (changed) {
      const nowDate = formatDate(new Date());
      const data = {
        type: {id:"main",subName:""},
        editedItem: newData,
        oldItemValue: oldData,
        modifiedDate: nowDate,
        user: "test",
      };
      //update data in backend

      //set data to state
      const newEdit = [...this.state.product_detail["editHistory"], data];
      const newProductDetail = this.state.product_detail;
      for (let key in newData) {
        newProductDetail[key] = newData[key];
      }
      newProductDetail["editHistory"] = newEdit;
      newProductDetail["ModifiedOn"] = nowDate;

      console.log(newProductDetail);

      this.setState({
        product_detail: newProductDetail,
      });
      return true;
    }

    return false;
  };

  componentDidMount() {
    this.getProductDetailData();
  }

  handleImage = (number) => {
    if (number >= this.state.product_detail.Picture.length) {
      number = 0;
    } else if (number < 0) {
      number = this.state.product_detail.Picture.length - 1;
    }

    this.setState({
      imageNumber: number,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Paper>
              <ProductCard
                product={this.state.product_detail}
                imageNumber={this.state.imageNumber}
                onChangeImage={this.handleImage}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper>
              <ProductDetail
                product={this.state.product_detail}
                handleEditProduct={this.handleEditProduct}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <ProductEditHistory product={this.state.product_detail}/>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>ยอดขาย (chart)</Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ProductDetailContainer;
