import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import UploadImage from "./UploadImage";
import ProductDetailMainForm from "./ProductDetailMainForm";
import ProductDetailSubForm from "./ProductDetailSubForm";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import AddSaleChannel from "./AddSaleChannel";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import SaveIcon from "@material-ui/icons/Save";
import ListItem from "@material-ui/core/ListItem";
import { Typography } from "@material-ui/core";
import { formatDate } from "../../../Helpers/date";
import EditHistory from "./EditHistoryTable";

const useStyles = makeStyles((theme) => ({
  paper1: {
    backgroundColor: "rgb(255,255,255)",
  },
  mainDetail: {
    width: "100%",
    margin: 0,
    padding: "1% 0%",
    color: "rgb(80,80,80)",
  },
  headerMain: {
    margin: 0,
    padding: 0,
    marginLeft: "1%",
  },
  subDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function ProductAdd() {
  const classes = useStyles();
  const [edited, setEdited] = React.useState(false);
  const [waiting, setWating] = React.useState(false);
  const [editedSubData, setEditedSubData] = React.useState(false);
  const [imageEdited, setImageEdited] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    severity: null,
    message: null,
  });
  const [expanded, setExpanded] = React.useState(true);
  const [subProduct, setSubProduct] = React.useState([]);
  const [image, setImage] = React.useState([]);
  const [data, setData] = React.useState({
    product_id: "",
    product_name: "",
    product_description: "",
    product_category: "",
    product_weight: 0,
    product_price: 0,
    product_stock: 0,
    product_sold: 0,
    product_order: 0,
    product_subItems: [],
    product_image: null,
    product_createOn: null,
    product_modifiedOn: null,
    product_edit_history: [],
  });
  const [oldData, setOldData] = React.useState({
    product_id: null,
    product_name: "",
    product_description: "",
    product_category: "",
    product_weight: 0,
    product_price: 0,
    product_stock: 0,
    product_sold: 0,
    product_order: 0,
    product_subItems: [],
    product_image: null,
    product_createOn: null,
    product_modifiedOn: null,
    product_edit_history: [],
  });

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = async function (e) {
      await setImage([...image, reader.result]);
      if (!imageEdited) {
        setImageEdited(!imageEdited);
      }
      if (!edited) {
        setEdited(!edited);
        setAlertMessage({
          severity: "warning",
          message: 'ข้อมูลมีการเปลี่ยนแปลง! กรุณากดปุ่ม "บันทึกข้อมูล" เพื่อยืนยันการเปลี่ยนแปลง',
        });
      }
    };
  };

  React.useEffect(() => {
    const path = window.location.pathname;
    // this.setState({
    //   product_id: path.split("/product/productdetail/")[1],
    // });
    getProductDetailData();
  }, []);

  const getProductDetailData = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var response_data = JSON.parse(xhttp.responseText);
        setOldData(response_data);
        setData(response_data);
        for (let i = 0; i < response_data.product_subItems.length; i++) {
          response_data.product_subItems[i]["id"] = response_data.product_subItems[i].Name;
        }
        setSubProduct(JSON.parse(JSON.stringify(response_data.product_subItems)));
        setImage(JSON.parse(JSON.stringify(response_data.product_image)));
      }
    };
    xhttp.open("GET", "/productdetail_mockups/product_detail.json", true);
    xhttp.send();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleData = (value, tag) => {
    let items = { ...data };
    items[tag] = value;
    setData(items);
    if (!edited) {
      setEdited(!edited);
      setAlertMessage({
        severity: "warning",
        message: 'ข้อมูลมีการเปลี่ยนแปลง! กรุณากดปุ่ม "บันทึกข้อมูล" เพื่อยืนยันการเปลี่ยนแปลง',
      });
    }
  };

  const confirmEdit = (event) => {
    event.preventDefault();
    if (edited) {
      const typeOfHistory = [
        "product_id",
        "product_name",
        "product_price",
        "product_category",
        "product_weight",
        "product_stock",
      ];
      let newHistory = {};
      let oldHistory = {};
      let changed = false;
      for (let i = 0; i < typeOfHistory.length; i++) {
        if (data[typeOfHistory[i]] !== oldData[typeOfHistory[i]]) {
          newHistory[typeOfHistory[i]] = data[typeOfHistory[i]];
          oldHistory[typeOfHistory[i]] = oldData[typeOfHistory[i]];
          changed = true;
        }
      }
      //check if data changed ?
      const nowDate = formatDate(new Date());
      if (changed) {
        data.product_edit_history = [
          ...data.product_edit_history,
          {
            type: "แก้ไขข้อมูลสินค้าหลัก",
            editedItem: newHistory,
            oldItemValue: oldHistory,
            modifiedDate: nowDate,
            user: "test",
          },
        ];
      }
      if (setImageEdited) {
        data.product_image = image;
      }
      if (editedSubData) {
        //check deleted data
        let history;
        let deletedIndex = [];
        for (let i = 0; i < data.product_subItems.length; i++) {
          if (subProduct.findIndex((sub) => sub.id === data.product_subItems[i].Name) === -1) {
            deletedIndex.push(i);
          }
        }
        for (let i = 0; i < deletedIndex.length; i++) {
          history = {
            type: "ลบข้อมูลสินค้าย่อย",
            newValue: {
              Name: "",
              Price: null,
              Stock: null,
              Weight: null,
              Sold: null,
              Order: null,
            },
            oldValue: { ...data.product_subItems[deletedIndex[i]] },
            modifiedDate: nowDate,
            user: "test",
          };
          data.product_edit_history = [...data.product_edit_history, history];
        }
        //check changed value
        const SubType = ["Price", "Name", "Stock", "Weight"];
        let sub_changed = false;
        let sub_edited = {};
        let sub_oldvalue = {};
        for (let i = 0; i < subProduct.length; i++) {
          sub_changed = false;
          sub_edited = {};
          sub_oldvalue = {};
          let index = data.product_subItems.findIndex((sub) => sub.Name === subProduct[i].id);
          if (index !== -1) {
            //check some changed value
            for (let k = 0; k < SubType.length; k++) {
              if (data.product_subItems[index][SubType[k]] !== subProduct[i][SubType[k]]) {
                sub_oldvalue[SubType[k]] = data.product_subItems[index][SubType[k]];
                sub_edited[SubType[k]] = subProduct[i][SubType[k]];
                sub_changed = true;
              }
            }
            if (sub_changed) {
              history = {
                type: "แก้ไขข้อมูลสินค้าย่อย",
                editedItem: { ...sub_edited },
                oldItemValue: { ...sub_oldvalue },
                modifiedDate: nowDate,
                user: "test",
              };
              data.product_edit_history = [...data.product_edit_history, history];
            }
          } else {
            history = {
              type: "เพิ่มข้อมูลสินค้าย่อย",
              editedItem: { ...subProduct[i] },
              oldItemValue: {
                Name: "",
                Price: null,
                Stock: null,
                Weight: null,
                Sold: null,
                Order: null,
              },
              modifiedDate: nowDate,
              user: "test",
            };
            data.product_edit_history = [...data.product_edit_history, history];
          }
        }

        for (let i = 0; i < subProduct.length; i++) {
          subProduct[i]["id"] = subProduct[i].Name;
        }
        data.product_subItems = subProduct;
      }

      data.product_modifiedOn = nowDate;
      setOldData({ ...data });
      setData({ ...data });
      setSubProduct(JSON.parse(JSON.stringify(subProduct)));
      //clear alert info
      console.log(data);
      setEdited(false);
      setAlertMessage({
        severity: null,
        message: null,
      });
    }
  };

  const addNewSubProduct = () => {
    let newData = {
      id: "newSubproduct" + subProduct.length,
      Name: "",
      Price: 0,
      Stock: 0,
      Weight: 0,
      Sold: 0,
      Order: 0,
    };
    let temp = [...subProduct, newData];
    setSubProduct(temp);
    if (!editedSubData) {
      setEditedSubData(!editedSubData);
    }
    if (!edited) {
      setEdited(!edited);
      setAlertMessage({
        severity: "warning",
        message: 'ข้อมูลมีการเปลี่ยนแปลง! กรุณากดปุ่ม "บันทึกข้อมูล" เพื่อยืนยันการเปลี่ยนแปลง',
      });
    }
  };

  const deleteSubProduct = (id) => {
    let newSubProduct = [...subProduct];
    const remove_id = newSubProduct.findIndex((data) => data.id === id);
    newSubProduct.splice(remove_id, 1);
    setSubProduct(newSubProduct);
    if (!editedSubData) {
      setEditedSubData(!editedSubData);
    }
    if (!edited) {
      setEdited(!edited);
      setAlertMessage({
        severity: "warning",
        message: 'ข้อมูลมีการเปลี่ยนแปลง! กรุณากดปุ่ม "บันทึกข้อมูล" เพื่อยืนยันการเปลี่ยนแปลง',
      });
    }
  };

  const handleSubProduct = (value, index, tag) => {
    let items = subProduct;
    items[index][tag] = value;
    setSubProduct(items);
    if (!editedSubData) {
      setEditedSubData(!editedSubData);
    }
    if (!edited) {
      setEdited(!edited);
      setAlertMessage({
        severity: "warning",
        message: 'ข้อมูลมีการเปลี่ยนแปลง! กรุณากดปุ่ม "บันทึกข้อมูล" เพื่อยืนยันการเปลี่ยนแปลง',
      });
    }
  };

  return (
    <>
      <ListItem>
        <BreadCrumbs
          before={[
            { href: "/dashboard", name: "หน้าแรก" },
            { href: "/product", name: "รายการสินค้า" },
          ]}
          presentpage={"ข้อมูลสินค้า ID : " + oldData.product_id}
        />
        <Chip
          label={"ยอดสั่งซื้อทั้งหมด : " + data.product_order}
          variant="outlined"
          color="primary"
          style={{ marginLeft: "auto" }}
        />
        <Chip label={"ยอดขายทั้งหมด : " + data.product_sold} variant="outlined" color="primary" style={{ marginLeft: "2%" }} />
      </ListItem>
      <Alert severity={alertMessage.severity || "info"}>
        <Typography>{alertMessage.message || "อัพเดทล่าสุด : " + data.product_modifiedOn}</Typography>
      </Alert>
      <Paper className={classes.paper1}>
        <div className={classes.mainDetail}>
          <ListItem className={classes.subDiv}>
            <h2 className={classes.headerMain}>ข้อมูลสินค้า</h2>
            <Button type="submit" form="edit_product_form" variant="contained" color="secondary" disabled={waiting}>
              <SaveIcon />
              บันทึกข้อมูล
            </Button>
          </ListItem>
        </div>
        <form id="edit_product_form" onSubmit={confirmEdit}>
          <Grid container style={{ paddingBottom: "2%" }}>
            <Grid item xs={7}>
              <ProductDetailMainForm data={data} handleData={handleData} />
            </Grid>
            <Grid item xs={5}>
              <UploadImage
                image={image}
                handleImage={handleUploadClick}
                handleData={handleData}
                description={data.product_description}
              />
            </Grid>
          </Grid>
          <Divider />
          <div className={classes.mainDetail}>
            <ListItem className={classes.subDiv}>
              <h2 className={classes.headerMain}>ช่องทางการขาย</h2>
              <div>
                {/* <Button
                variant="contained"
                color="primary"
                onClick={handleExpandClick}
                aria-expanded={expanded}
              >
                <AddCircleRoundedIcon />
                เพิ่มช่องทางการขาย
              </Button> */}
              </div>
            </ListItem>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <AddSaleChannel />
            </Collapse>
          </div>
          <Divider />
          <div className={classes.mainDetail}>
            <ListItem className={classes.subDiv}>
              <h2 className={classes.headerMain}>ข้อมูลสินค้าย่อย</h2>
              <div>
                <Button variant="contained" color="primary" onClick={addNewSubProduct}>
                  <AddCircleRoundedIcon />
                  เพิ่มข้อมูลสินค้าย่อย
                </Button>
              </div>
            </ListItem>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <ProductDetailSubForm data={subProduct} deleteSubProduct={deleteSubProduct} handleSubProduct={handleSubProduct} />
            </Grid>
          </Grid>
        </form>
        <div className={classes.mainDetail}>
          <ListItem className={classes.subDiv}>
            <h2 className={classes.headerMain}>ประวัติการแก้ไขสินค้า</h2>
          </ListItem>
        </div>
        <Grid container>
          <Grid item xs={12}>
            <EditHistory rows={data.product_edit_history} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
