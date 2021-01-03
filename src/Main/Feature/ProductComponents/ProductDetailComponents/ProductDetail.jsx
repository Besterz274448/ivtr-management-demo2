import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProductCard from "./ProductCard";
import ProductHistory from "./SubProduct";
import ProductSaleHistory from "./ProductSaleHistory";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_history: [],
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
      },
      imageNumber: 0,
    };
  }
  getProductDetailData = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=> {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        // Typical action to be performed when the document is ready:
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
              <ProductHistory product={this.state.product_detail} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <ProductSaleHistory />
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

export default ProductDetail;
