import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

import ProductListTable from "./ProductListTable";
import ProductListHeader from "./ProductListHeader";

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  fetchProductData = () => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.responseText);
        this.setState({
          product: [...data],
        });
      }
    };
    xhr.open("GET", "https://ivtr-server.herokuapp.com/product/");
    xhr.send();
  };

  componentDidMount() {
    this.fetchProductData();
  }

  render() {
    return (
      <>
        <ProductListHeader
          dataLength={this.state.product.length}
          date={
            this.state.product.length > 0 ? this.state.product[0].ModifiedOn : 0
          }
        />
        <ProductListTable rows={this.state.product} />
      </>
    );
  }
}

export default ProductContainer;
