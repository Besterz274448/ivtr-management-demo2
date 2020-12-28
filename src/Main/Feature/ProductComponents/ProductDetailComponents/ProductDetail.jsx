import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProductCard from './ProductCard'
import ProductHistory from "./SubProduct";
import ProductSaleHistory from "./ProductSaleHistory";


class ProductDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      edit_history:[],
      sale_history: [],
      product_detail:[],
    }
  }
  render(){
      return (
        <React.Fragment>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Paper>
                <ProductCard />
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper>
                <ProductHistory />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper >
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
