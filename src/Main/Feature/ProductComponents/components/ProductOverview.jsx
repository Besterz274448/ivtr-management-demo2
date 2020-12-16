import React from "react";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";

export default function ProductOverview({ product_data, closeProductDetail }) {
  console.log(product_data.id);
  return product_data.id === undefined ? (
    <Paper></Paper>
  ) : (
    <Paper style={{ textAlign: "center" }}>
        UI for Test Data Only{" "}
        <CloseIcon style={{cursor:"pointer"}}onClick={closeProductDetail}></CloseIcon>

    </Paper>
  );
}
