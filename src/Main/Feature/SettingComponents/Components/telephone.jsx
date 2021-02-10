import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import {
  FormHelperText,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@material-ui/core";
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[0]/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask={false}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function FormattedInputs(props) {
  const {
    value,
    oldValue,
    label = "inputLabel",
    tag,
    id,
    helper,
    classes,
    onChange: handleOnChange,
    onBlur: handleOnBlur,
  } = props;
  return (
    <FormControl
      variant="outlined"
      className={classes}
      style={{ marginTop: "16px", marginBottom: "8px" }}
      error={value.replace(/-/g, "") !== oldValue}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        value={value}
        onChange={(e) => {
          handleOnChange(e.target.value, tag);
        }}
        onBlur={(e) => {
          handleOnBlur(e.target.value, tag);
        }}
        label="Name"
        inputComponent={TextMaskCustom}
      />
      <FormHelperText id={id}>
        {value === ""
          ? "กรุณากรอกข้อมูล"
          : value.replace(/-/g, "") !== oldValue
          ? helper === null
            ? "ช่องข้อมูลที่ดำเนินการแก้ไข"
            : helper
          : " "}
      </FormHelperText>
    </FormControl>
  );
}
