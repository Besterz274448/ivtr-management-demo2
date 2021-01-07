import React from "react"
import Product from './ProductListComponents/ProductContainer'
import { Switch, Route } from "react-router-dom";
import ProductAdd from "./ProductAddComponents/ProductAdd";
import ProductDetail from "./ProductDetailComponents/ProductDetailContainer"

export default function ProductRoute() {

  return (
    <Switch>
      <Route path="/product" exact component={Product} />
      <Route path="/product/addproduct" exact component={ProductAdd} />
      <Route path="/product/productdetail/:id" component={ProductDetail}></Route>
    </Switch>
  );
}
