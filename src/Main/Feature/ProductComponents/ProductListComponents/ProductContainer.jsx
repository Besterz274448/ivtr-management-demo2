import React, { Component } from "react";
import ProductListTable from "./ProductListTable";
import ProductListHeader from "./ProductListHeader";
import "./ProductList.css";

const numeric_record = ["Price", "Stock", "Sold"];

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      data: [],
      filter_data: [],
      filter_selected: "id",
      operator_selected: ">",
      defaultSearch: "",
      open:true,
    };
  }

  findDuplicate = (raw_data, filter_id) => {
    var filter = [];
    for (let i = 0; i < raw_data.length; i++) {
      if (filter.indexOf(raw_data[i][filter_id]) === -1) {
        filter.push(raw_data[i][filter_id]);
      }
    }
    return filter;
  };

  handleChangeSelected = (state, value) => {
    if (numeric_record.indexOf(value) !== -1) {
      this.setState({
        operator_selected: ">",
      });
    }
    if (state === "filter_selected") {
      this.setState({
        filter_data: this.findDuplicate(this.state.product, value),
      });
    }
    this.setState({
      [state]: value,
      data: this.state.product,
      defaultSearch: this.state.defaultSearch === null ? "" : null,
    });
  };

  handleChangeTextfield = (value) => {
    let filterData;
    if (value === "") {
      filterData = this.state.product;
    } else if (numeric_record.indexOf(this.state.filter_selected) !== -1) {
      switch (this.state.operator_selected) {
        case ">":
          filterData = this.state.product.filter((data) => {
            return (
              parseFloat(data[this.state.filter_selected]) > parseFloat(value)
            );
          });
          break;
        case "<":
          filterData = this.state.product.filter((data) => {
            return (
              parseFloat(data[this.state.filter_selected]) < parseFloat(value)
            );
          });
          break;
        case "=":
          filterData = this.state.product.filter((data) => {
            return (
              parseFloat(data[this.state.filter_selected]) === parseFloat(value)
            );
          });
          break;
        case "[]":
          var min_value =
            document.getElementById("product_search_min_range").value || null;
          var max_value =
            document.getElementById("product_search_max_range").value || null;
          if (min_value !== null && max_value !== null) {
            filterData = this.state.product.filter((data) => {
              return (
                parseFloat(data[this.state.filter_selected]) >=
                  parseFloat(min_value) &&
                parseFloat(data[this.state.filter_selected]) <=
                  parseFloat(max_value)
              );
            });
          } else {
            filterData = this.state.product;
          }
          break;
        default:break;
      }
    } else {
      filterData = this.state.product.filter((data) => {
        return (
          data[this.state.filter_selected]
            .toLowerCase()
            .indexOf(value.toLowerCase()) >= 0
        );
      });
    }
    this.setState({
      data: filterData,
    });
  };

  fetchProductData = () => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.responseText);
        this.setState({
          product: [...data],
          data: [...data],
          filter_data: this.findDuplicate(data, this.state.filter_selected),
          open:false
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
          filter_selected={this.state.filter_selected}
          operator_selected={this.state.operator_selected}
          handleChangeSelected={this.handleChangeSelected}
          handleChangeTextfield={this.handleChangeTextfield}
          filter_data={this.state.filter_data}
          defaultSearch={this.state.defaultSearch}
          date={
            this.state.product.length > 0 ? this.state.product[0].ModifiedOn : 0
          }
        />
        <ProductListTable rows={this.state.data} open={this.state.open}/>
      </>
    );
  }
}

export default ProductContainer;
