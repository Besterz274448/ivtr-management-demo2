import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class ProductDetail extends Component{
  render(){
      return (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Paper>ข้อมูลสินค้า</Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper>ประวัติการแก้ไขสินค้า</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>ประวัติการขาย</Paper>
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
