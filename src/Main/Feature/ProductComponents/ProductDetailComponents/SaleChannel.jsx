import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Avatar from "@material-ui/core/Avatar";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


function createData(avatar, url) {
  return { avatar, url };
}

const rows = [
  createData(
    "data:image/jpeg;base64,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",
    "no connected"
  ),
  createData(
    "https://yt3.ggpht.com/ytc/AAUvwnj_TcLKVW2OJwdUyTm1QrRgsn8qnjVOBGXHDfxXKw=s900-c-k-c0x00ffffff-no-rj",
    "no connected"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuJJmLJPHboVahnvpzcFXhni3B_PWg9SzUiw&usqp=CAU",
    "no connected"
  ),
  createData(
      "https://ast.kaidee.com/blackpearl/v9.4.13/_next/static/images/kaidee-profile-eba8bfcc7a154f3e9c924e43065b8564.jpg",
      "no connected"
  ),
  createData(
      "data:image/png;base64,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",
      "no connected"
  ),
];

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  root: {
    marginTop: "6%",
    height: "475px",
  },
  headChannel1:{
      width:"1%"
  },
  headChannel2:{
    width:"20%"
},

});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headChannel1}>CHANNEL</TableCell>
            <TableCell className={classes.headChannel2} align="left">LINK URL</TableCell>
            <TableCell className={classes.headChannel2} align="left">EDIT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Avatar src={row.avatar}/>
              </TableCell>
              <TableCell align="left">{row.url}</TableCell>
              <TableCell align="left">edit</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
