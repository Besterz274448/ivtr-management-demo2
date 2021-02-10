import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

TextField.PropTypes={
  label:PropTypes.string.isRequired,
    value :PropTypes.string,
    oldValue :PropTypes.string,
    tag:PropTypes.string.isRequired,
    helper:PropTypes.string,
    required:PropTypes.bool,
}

export default function TextFields(props) {
  const {
    label = "Label",
    value = "Value",
    oldValue = "Value",
    tag,
    helper = null,
    required = false,
    onChange: handleOnChange,
    onBlur: handleOnBlur,
    ...other
  } = props;
  return (
    <TextField
      label={label}
      error={value !== oldValue || value === ""}
      value={value}
      helperText={
        value === ""
          ? helper === null
            ? "กรุณากรอกข้อมูล"
            : helper
          : value !== oldValue
          ? "ช่องข้อมูลที่ดำเนินการแก้ไข"
          : " "
      }
      required={required}
      margin="normal"
      InputLabelProps={{ shrink: value !== "" }}
      variant="outlined"
      onChange={(e) => {
        console.log(helper);
        handleOnChange(e.target.value, tag);
      }}
      onBlur={(e) => {
        handleOnBlur(e.target.value, tag);
      }}
      {...other}
    />
  );
}
