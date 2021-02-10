import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Divider,
  TextField,
  makeStyles,
} from "@material-ui/core";
import TextFields from "../Components/textFields";
import UpPackage from "../Components/upPackage";

const useStyles = makeStyles((theme) => ({
  boxInput: { marginLeft: "10%" },
  formInput: { width: "80ch", margin: "8px" },
  inputText: { color: "rgb(70,70,70)" },
  FormControl: { width: "100%" },
  packageFrom: { width: "39ch", margin: "8px" },
  address: { width: "40ch" },
  detail: { width: "70%" },
}));
export default function InputWithIcon(props) {
  const packages = [
    "หมดอายุการใช้งาน",
    "ทดลองใช้งาน",
    "BASIC",
    "COMMON",
    "MAJOR",
    "รอการตรวจสอบ",
  ];
  const classes = useStyles();
  const [data, setData] = useState({
    shopName: "",
    email: "",
    shopID: "",
    package: { expire: 1612425076244, pack: 0, enroll: "" },
    address: {
      phone: "",
      detail: "",
      distrust: "",
      province: "",
      city: "",
      zipCode: "",
    },
    texCode: "",
  });
  const [change, setChange] = useState(false);
  const [open, setOpen] = React.useState(false);
  const expire = new Date().getTime() > data.package.expire;
  const handleOnBlur = (value, tag) => {
    if (change) {
      props.handleData(value, ["general", tag]);
      setChange(false);
    }
  };
  const handleOnChange = (value, tag) => {
    let update = { ...data };
    update[tag] = value;
    setData(update);
    setChange(true);
  };
  React.useEffect(() => {
    setData(props.data);
    // console.log(props.oldData, props.data);
  }, [props.data]);
  return (
    <>
      <Typography variant="h6" className={classes.boxInput}>
        ข้อมูลร้านค้า
      </Typography>
      <Box className={classes.boxInput} display="flex">
        <TextField
          label="รหัสร้านค้า"
          className={classes.packageFrom}
          value={data.shopID}
          helperText="ใช้สำหรับแจ้งเจ้าหน้าที่เพื่อติดต่อ"
          disabled
          margin="normal"
          variant="outlined"
          onChange={() => {
            alert("คุณกำลังแก้ไขโค๊ด ไม่สามารถดำเนินการได้");
          }}
        />
        {/* package */}
        <TextField
          label="แพ็คเกจ"
          error={expire || data.package.pack !== props.oldData.package.pack}
          className={classes.packageFrom}
          value={packages[data.package.pack]}
          helperText={
            data.package.pack !== props.oldData.package.pack
              ? "กำลังดำเนินการเปลี่ยนแพ็คเกจ!! กรุณากดบันทึกเพื่อยืนยันการเปลี่ยน"
              : expire === true
              ? `หมดอายุ เมื่อวันที่ ${new Date(
                  data.package.expire
                ).toLocaleDateString()} ต้องดำเนินการต่ออายุเพื่อใช้งาน`
              : `จะหมดอายุในวันที่ ${new Date(
                  data.package.expire
                ).toLocaleDateString()}`
          }
          disabled
          margin="normal"
          variant="outlined"
        />
        <Box ml={2} mt={2}>
          <UpPackage />
        </Box>
      </Box>
      {/* E-Mail */}
      <Box className={classes.boxInput}>
        <TextField
          label="E-Mail"
          className={classes.formInput}
          value={data.email}
          helperText="E-Mail ที่ใช้สำหรับเข้าระบบ"
          disabled
          margin="normal"
          variant="outlined"
          onChange={() => {
            alert("คุณกำลังแก้ไขโค๊ด ไม่สามารถดำเนินการได้");
          }}
        />
      </Box>
      {/* ชื่อร้านค้า */}
      <Box className={classes.boxInput}>
        <TextFields
          label="ชื่อร้านค้า"
          tag="shopName"
          className={classes.formInput}
          value={data.shopName}
          oldValue={props.oldData.shopName}
          helper="ชื่อร้านค้าความยาวไม่เกิน 100 ตัวอักษร"
          required={true}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </Box>
      <Box className={classes.boxInput} mb={2.75}>
        <TextFields
          label="เลขประจำตัวผู้เสียภาษี"
          tag="texCode"
          error={data.texCode !== props.oldData.texCode}
          className={classes.formInput}
          value={data.texCode}
          oldValue={props.oldData.texCode}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </Box>
      <Divider />
      <Divider />
      <Divider />
      <Divider />
    </>
  );
}
