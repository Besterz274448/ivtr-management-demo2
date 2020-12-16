import React from "react";
import ProductTable from "./components/ProductTable";
import ProductOverview from "./components/ProductOverview";
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
    <Grid container item xs={12} spacing={1}>
      <Grid item xs={10}>
        <ProductTable showProductDetail={showProductDetail} />
      </Grid>
      <Grid item xs={2}>
        <ProductOverview
          product_data={product_data}
          closeProductDetail={closeProductDetail}
        />
      </Grid>
    </Grid>
  );
}
