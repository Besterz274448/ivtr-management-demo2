import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { blue } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";



function FolderList({ label, name }) {

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={label} secondary={name} />
    </ListItem>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            H
          </Avatar>
        }
        title={"ข้อมูลของ " + props.item}
        subheader="อัพเดทล่าสุด :14/08/2016"
      />
      <CardMedia
        className={classes.media}
        image="https://www.cmushop.com/assets/uploads/post/6dd71b83f21e173a26af6d62fd181a2b.jpg"
        title="Paella dish"
      />
      {/* <Grid container spacing={4}>
        <Grid item xs={3}>
          <FolderList label="ราคา" name="900" />
        </Grid>
        <Grid item xs={3}>
          <FolderList label="ประเภท" name="รองเท้า" />
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12}></Grid>
      </Grid> */}
      <CardContent></CardContent>
    </Card>
  );
}
