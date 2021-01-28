import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

import TotalCustomers from "./TotalCustomer";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "60vh",
    overflowY: "auto",
    width: "100%",
    background: "#F4F6F6",
  },
  comment: {
    display: "inline-block",
    color: "black",
    background: "#EBEDEF",
    padding: 6,
    borderRadius: 5,
    float: "left",
  },
  commentAgent: {
    display: "inline-block",
    color: "white",
    background: "#3f50b5",
    padding: 6,
    borderRadius: 5,
    float: "right",
  },
  paperComment: {
    background: "#FBFCFC",
  },
  paperSummary: {
    background: "#FBFCFC",
    padding: 20,
  },
});

export default function CFPage() {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={5} container className={classes.paperComment}>
          <b style={{ margin: "15px" }}>คอมเม้นต์</b>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={8}>
                  <ListItemText
                    className={classes.comment}
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={8} className={classes.paper}>
                  <ListItemText
                    className={classes.comment}
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={8} className={classes.paper}>
                  <ListItemText
                    className={classes.comment}
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="4">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    className={classes.commentAgent}
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7} container className={classes.paperSummary}>
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalCustomers />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
