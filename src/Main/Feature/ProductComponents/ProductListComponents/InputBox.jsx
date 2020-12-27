import React from "react";
import Input from "@material-ui/core/Input";

export default function InputBox(props) {
  return (
    <Input
      type="number"
      style={{ width: 50, height: 20 }}
      placeholder={props.name}
      id={props.id}

      onChange={(event) => {

        props.onSearchDataFromRange(event.target.value);
      }}
      size="small"
    />
  );
}