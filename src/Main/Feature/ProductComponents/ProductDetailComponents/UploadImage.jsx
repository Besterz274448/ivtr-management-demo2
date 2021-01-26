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
    marginRight: "auto",
    marginLeft: "auto",
    overflowX: "auto",
    overflowY: "none",
  },
  inputText: {
    color: "rgb(70,70,70)",
  },
}));

export default function UploadImage(props) {
  const classes = useStyles();
  const { image } = props;
  const [description, setDescription] = React.useState();
  const [changed, setChanged] = React.useState(false);

  React.useEffect(() => {
    setDescription(props.description);
  }, [props.description]);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <div className={classes.boxInput}>
            <TextField
              className={classes.inputForm}
              style={{ margin: 8 }}
              label="รายละเอียดสินค้า"
              value={description}
              onBlur={(event) => {
                if (changed) {
                  props.handleData(event.target.value, "product_description");
                  setChanged(false);
                }
              }}
              onChange={(event) => {
                setDescription(event.target.value);
                setChanged(true);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                className: classes.inputText,
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
        <p className={classes.inputText}>
          สามารถอัพโหลดรูปภาพได้จำนวนสูงสุด 4 รูปภาพ
        </p>
        <div className={classes.imageTag}>
          <ListItem style={{ clear: "display:" }}>
            {image != null
              ? image.map((data, index) => {
                  return <ImageComponent image={data} key={data + index} />;
                })
              : false}
          </ListItem>
        </div>
      </div>
    </>
  );
}
