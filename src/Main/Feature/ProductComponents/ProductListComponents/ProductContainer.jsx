import React from "react";
import ProductTable from "./ProductTable";
import Grid from "@material-ui/core/Grid";
export default function Product() {
  const [product_data, setProductData] = React.useState({});

  function showProductDetail(data) {
    setProductData({ ...data });
  }

  function closeProductDetail(){
      setProductData({});
  }

  return (
    <Grid container  spacing={1}>
      <Grid item xs={12}>
        <ProductTable showProductDetail={showProductDetail} />
      </Grid>
    </Grid>
  );
}
