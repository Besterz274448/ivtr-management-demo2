import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import ImageComponent from "./ImageComponent";

const useStyles = makeStyles((theme) => ({
  uploadBox: {
    display: "none",
  },
  inputForm: {
    width: "95%",
  },
  boxInput: {
    marginLeft: "2%",
    marginBottom: "1%",
  },
  imageTag: {
    width: "95%",
    marginRight:"auto",
    marginLeft:"auto",
    overflowX: "auto",
    overflowY: "none",
  },
}));

export default function UploadImage(props) {
  const classes = useStyles();
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <div className={classes.boxInput}>
            <TextField
              className={classes.inputForm}
              style={{ margin: 8 }}
              label="รายละเอียดสินค้า"
              value={props.description}
              onChange={(event)=>{
                props.handleData(event.target.value,"product_description")
              }}
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              rows={6}
              variant="outlined"
            />
          </div>
        </div>
        <input
          accept="image/*"
          className={classes.uploadBox}
          id="contained-button-file"
          multiple
          type="file"
          onChange={props.handleImage}
        />
        <Button
          color="primary"
          variant="contained"
          style={{ paddingTop: "5px", paddingBottom: "0px" }}
        >
          <label htmlFor="contained-button-file">
            <span>
              <AddPhotoAlternateIcon />
            </span>
            <span style={{ verticalAlign: "top" }}>อัพโหลดรูปภาพ</span>
          </label>
        </Button>
        <p>สามารถอัพโหลดรูปภาพได้จำนวนสูงสุด 4 รูปภาพ</p>
        <div className={classes.imageTag}>
          <ListItem style={{ clear: "display:" }}>
            {props.image != null ? props.image.map((data, index) => {
              return <ImageComponent image={data} key={data + index} />;
            }) : false}
          </ListItem>
        </div>
      </div>
    </>
  );
}
