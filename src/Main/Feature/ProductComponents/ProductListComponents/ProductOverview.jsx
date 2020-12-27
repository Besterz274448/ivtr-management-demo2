import React from "react";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import {NavLink} from "react-router-dom";

const paperStyle = {
  height: "440px"
};

const productOverall_header = {
  textAlign:"right"
};

const buttonNavigation = {

}


export default function ProductOverview({ product_data, closeProductDetail }) {
  return product_data.id === undefined ? (
    false
  ) : (
    <Paper style={paperStyle}>
      <section id="productOverall_header" style={productOverall_header}>
        <CloseIcon style={{ cursor: "pointer" }} onClick={closeProductDetail} />
      </section>
      {product_data.id}
      <NavLink to={"/product/productdetail/"+product_data.id}>
        <button style={buttonNavigation}>More Detail</button>
      </NavLink>
    </Paper>
  );
}
