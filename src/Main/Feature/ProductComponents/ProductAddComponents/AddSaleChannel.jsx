import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogSaleChannel from './DialogSaleChannel'


const rows = [
 
  ];

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom:"2%"
  },
  channelButton: {
    margin: "0% 1%",
  },
  buttonText: {
    paddingLeft: "10%",
  },
}));

export default function AddSaleChannel(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [channel, setChannel] = React.useState("");
  const [imageChannel, setImageChannel] = React.useState("");

  const handleClickOpen = (channel,img) => {
    setImageChannel(img);
    setChannel(channel);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <ListItem>
        <p>Add Channel : </p>
        <Button
          className={classes.channelButton}
          color="primary"
          variant="contained"
          size="small"
          onClick={()=>{
            handleClickOpen("Lazada","https://www.theeleader.com/wp-content/uploads/2019/02/LAZADA-app-logo.png")
          }}
        >
          <img
            src="https://www.theeleader.com/wp-content/uploads/2019/02/LAZADA-app-logo.png"
            width="25px"
            alt="lazada"
          ></img>
          <span className={classes.buttonText}>Lazada</span>
        </Button>
        <Button
          className={classes.channelButton}
          variant="contained"
          color="primary"
          size="small"
          onClick={()=>{
            handleClickOpen("Shopee","https://shopee.co.th/blog/wp-content/uploads/2020/11/shopee-1.png")
          }}
        >
          <img
            src="https://shopee.co.th/blog/wp-content/uploads/2020/11/shopee-1.png"
            width="25px"
            alt="shopee"

          ></img>
          <span className={classes.buttonText}>Shopee</span>
        </Button>
        <Button
          className={classes.channelButton}
          variant="contained"
          color="primary"
          size="small"
          onClick={()=>{
            handleClickOpen("JDCentral","https://img10.jd.co.th/n0/jfs/t10/17/763117283/18708/456375e2/5d3839c4Ne65a6378.png!q70.jpg")
          }}
        >
          <img
            src="https://img10.jd.co.th/n0/jfs/t10/17/763117283/18708/456375e2/5d3839c4Ne65a6378.png!q70.jpg"
            width="25px"
            alt="JDCentral"

          ></img>
          <span className={classes.buttonText}>JDCentral</span>
        </Button>
        <Button
          className={classes.channelButton}
          variant="contained"
          color="primary"
          size="small"
          onClick={()=>{
            handleClickOpen("Line","https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/768px-LINE_logo.svg.png")
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/768px-LINE_logo.svg.png"
            width="25px"
            alt="Line"

          ></img>
          <span className={classes.buttonText}>Line</span>
        </Button>
        <DialogSaleChannel open={open} handleClose={handleClose} nameChannel={channel} imageChannel={imageChannel} />
      </ListItem>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Channel</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Url</TableCell>
              <TableCell align="right">Sync</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
