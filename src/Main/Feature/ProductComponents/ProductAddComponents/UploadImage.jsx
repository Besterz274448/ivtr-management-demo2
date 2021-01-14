import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const useStyles = makeStyles((theme) => ({
  uploadBox: {
    display: "none",
  },
  
}));

export default function UploadImage(props) {
  const classes = useStyles();
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <img src="https://image.mfa.go.th/mfa/c_c_400x300/umufy3EgqL/migrate_directory/bulletin-20190127-194155.jpg"/>
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
        style={{ paddingTop: "5px", paddingBottom: "2px" }}
      >
        <label htmlFor="contained-button-file">
          <span>
            <AddPhotoAlternateIcon />
          </span>
          <span style={{ verticalAlign: "top" }}>อัพโหลดรูปภาพ</span>
        </label>
      </Button>
      <p>สามารถอัพโหลดรูปภาพได้จำนวนสูงสุด 4 รูปภาพ</p>
    </div>
  );
}
