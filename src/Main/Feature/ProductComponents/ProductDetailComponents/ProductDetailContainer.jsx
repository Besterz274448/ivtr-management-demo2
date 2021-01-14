import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import Paper from "@material-ui/core/Paper";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import SaleChannel from "./SaleChannel";
import ProductEditHistory from "./ProductEditHistory";
import { formatDate } from "../../../Helpers/date";
import ProductDetailOverall from "./ProductDetailOverall";

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
        type: { id: "main", subName: "" },
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

      this.setState({
        product_detail: newProductDetail,
      });
      return true;
    }

    return false;
  };

  handleEditSubProduct = (item) => {
    let newData = [];
    let oldData = [];
    let changed = false;
    let index = [];

    //check length item < state ? (delete case)

    //find data changed
    for (let i = 0; i < this.state.product_detail.SubProduct.length; i++) {
      let newTemp = {};
      let oldTemp = {};
      for (let key in this.state.product_detail.SubProduct[i]) {
        if (item[i][key] !== this.state.product_detail.SubProduct[i][key]) {
          newTemp[key] = item[i][key];
          oldTemp[key] = this.state.product_detail.SubProduct[i][key];
          changed = true;
        }
      }
      if (Object.keys(newTemp).length !== 0) {
        index.push(i);
        newData = [...newData, newTemp];
        oldData = [...oldData, oldTemp];
      }
    }
    if (this.state.product_detail.SubProduct.length < item.length) {
      changed = true;
      for (
        let i = this.state.product_detail.SubProduct.length;
        i < item.length;
        i++
      ) {
        newData = [
          ...newData,
          {
            Name: item[i].Name.toString(),
            Price: parseFloat(item[i].Price),
            Stock: parseInt(item[i].Stock),
            Sold: item[i].Sold,
            Order: item[i].Order,
          },
        ];
        index.push(i);
        oldData = [
          ...oldData,
          {
            Name: "",
            Price: "",
            Stock: "",
            Sold: "",
            Order: "",
          },
        ];
      }
    }

    if (changed) {
      const nowDate = formatDate(new Date());
      const AllData = [];

      for (let i = 0; i < index.length; i++) {
        let tagname =
          index[i] < this.state.product_detail.SubProduct.length
            ? this.state.product_detail.SubProduct[index[i]].Name
            : newData[i].Name;
        console.log(tagname);
        let data = {
          type: { id: "sub", subName: tagname },
          editedItem: newData[i],
          oldItemValue: oldData[i],
          modifiedDate: nowDate,
          user: "test",
        };
        AllData.push(data);
      }
      const newEdit = [...this.state.product_detail["editHistory"], ...AllData];
      console.log(newEdit);
      const newSubProductDetail = this.state.product_detail;
      for (let i = 0; i < index.length; i++) {
        if (index[i] < this.state.product_detail.SubProduct.length) {
          for (let key in newData[i]) {
            newSubProductDetail.SubProduct[index[i]][key] = newData[i][key];
          }
        } else {
          newSubProductDetail.SubProduct = [
            ...newSubProductDetail.SubProduct,
            {
              Name: newData[i].Name.toString(),
              Price: parseFloat(newData[i].Price),
              Stock: parseInt(newData[i].Stock),
              Sold: newData[i].Sold,
              Order: newData[i].Order,
            },
          ];
        }
      }
      newSubProductDetail["editHistory"] = newEdit;
      newSubProductDetail["ModifiedOn"] = nowDate;

      this.setState({
        product_detail: newSubProductDetail,
      });
      console.log(this.state.product_detail);
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
        <div style={{marginLeft:"1%"}}>
          <BreadCrumbs
            before={[{ href: "/dashboard", name: "home" },{ href: "/product", name: "รายการสินค้า" }]}
            presentpage="รายละเอียดสินค้า"
          />
        </div>

        <Grid container>
          <ProductDetailOverall product={this.state.product_detail} />
        </Grid>
        <Grid container spacing={1}>
          <Grid item sm={3}>
            <Paper>
              <ProductCard
                product={this.state.product_detail}
                imageNumber={this.state.imageNumber}
                onChangeImage={this.handleImage}
                handleEditProduct={this.handleEditProduct}
              />
            </Paper>
            <SaleChannel />
          </Grid>
          <Grid item sm={9}>
            <Paper>
              <ProductDetail
                product={this.state.product_detail}
                SubProduct={[...this.state.product_detail.SubProduct]}
                handleEditSubProduct={this.handleEditSubProduct}
              />
            </Paper>
            <ProductEditHistory product={this.state.product_detail} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Paper></Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Paper>ยอดขาย (chart)</Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ProductDetailContainer;
