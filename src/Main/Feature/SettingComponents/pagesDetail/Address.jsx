import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import InputPhone from "../Components/telephone";
import TextFields from "../Components/textFields";
const useStyles = makeStyles((theme) => ({
  boxFull: { marginLeft: "10%", marginRight: "10%" },
  inputFull: { width: "98%", marginLeft: "2%" },
  inputHalf: { width: "48%", marginLeft: "2%" },
}));
// function TextFields(props) {
//   const {
//     label,
//     value,
//     oldValue,
//     tag,
//     change,
//     helper = null,
//     onChange: handleOnChange,
//     onBlur: handleOnBlur,
//     ...other
//   } = props;

//   return (
//     <TextField
//       label={label}
//       error={value !== oldValue}
//       value={value}
//       helperText={
//         value === ""
//           ? "กรุณากรอกข้อมูล"
//           : value !== oldValue
//           ? helper === null
//             ? "ช่องข้อมูลที่ดำเนินการแก้ไข"
//             : helper
//           : " "
//       }
//       margin="normal"
//       InputLabelProps={{ shrink: value !== "" }}
//       variant="outlined"
//       onChange={(e) => {
//         handleOnChange(e.target.value, tag);
//       }}
//       onBlur={(e) => {
//         handleOnBlur(e.target.value, tag);
//       }}
//       inputComponent
//       {...other}
//     />
//   );
// }

export default function Address(props) {
  const classes = useStyles();
  const [change, setChange] = React.useState(false);
  const [address, setAddress] = React.useState({
    name: "",
    tel: "",
    detail: "",
    distrust: "",
    province: "",
    city: "",
    zipCode: "",
  });
  const handleOnBlur = (value, tag) => {
    if (change) {
      props.handleData(value, ["general", "address", tag]);
      setChange(false);
    }
  };
  const handleOnChange = (value, tag) => {
    let update = { ...address };
    update[tag] = value;
    setAddress(update);
    setChange(true);
  };
  React.useEffect(() => {
    setAddress(props.data);
  }, [props.data]);
  return (
    <div>
      <Box className={classes.boxFull} mt={5}>
        <Typography variant="h6">ข้อมูลที่อยู่ผู้จัดส่งสินค้า</Typography>
      </Box>
      <Box className={classes.boxFull}>
        <TextFields
          label="ชื่อผู้ส่ง"
          value={address.name}
          oldValue={props.oldData.name}
          tag="name"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
        <InputPhone
          classes={classes.inputHalf}
          id="phone"
          label="เบอร์โทร"
          tag="tel"
          value={address.tel}
          oldValue={props.oldData.tel}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          helper="test"
        />
      </Box>
      <Box className={classes.boxFull}>
        <TextFields
          label="รายละเอียดที่อยู่"
          value={address.detail}
          oldValue={props.oldData.detail}
          tag="detail"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputFull}
        />
      </Box>
      <Box className={classes.boxFull}>
        <TextFields
          label="แขวง"
          value={address.distrust}
          oldValue={props.oldData.distrust}
          tag="distrust"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
        <TextFields
          label="เขต"
          value={address.province}
          oldValue={props.oldData.province}
          tag="province"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
      </Box>
      <Box className={classes.boxFull}>
        <TextFields
          label="จังหวัด"
          value={address.city}
          oldValue={props.oldData.city}
          tag="city"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
        <TextFields
          label="รหัสไปรษณีย์"
          value={address.zipCode}
          oldValue={props.oldData.zipCode}
          tag="zipCode"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
      </Box>
    </div>
  );
}
