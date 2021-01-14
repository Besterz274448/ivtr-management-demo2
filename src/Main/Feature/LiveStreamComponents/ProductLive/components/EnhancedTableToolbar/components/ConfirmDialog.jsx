import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

export default function ConfirmDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { onActiveLiveAll, status, displayText, color } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    onActiveLiveAll(event, status);
    setOpen(false);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Button
        variant="contained"
        color={color}
        onClick={handleClickOpen}
        size="small"
      >
        {displayText}
      </Button>
      <Dialog

        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>
          <Typography variant="h6" color="textPrimary" display="inline">
            {displayText}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" gutterBottom color="textSecondary">
              ระบบจะทำการ{displayText} ของสินค้าในหน้าไลฟ์ทุกชิ้น
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            size="small"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            size="small"
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
