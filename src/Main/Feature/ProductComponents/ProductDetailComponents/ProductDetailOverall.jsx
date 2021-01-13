import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CategoryIcon from "@material-ui/icons/Category";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ShopIcon from "@material-ui/icons/Shop";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  listItemView: {
    display: "inline-block",
    width: "19%",
    border: "1px solid rgb(180,180,180)",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius:"10px"
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom:"15px"
  },
}));

const FolderList = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.listItemView}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{props.imageIcon}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h6">{props.detail}</Typography>}
          secondary={props.label}
        />
      </ListItem>
    </List>
  );
};

export default function ProductDetailOverAll(props) {
  const product_detail = [
    {
      label: "ราคา",
      detail: props.product.Price,
      imageIcon: <MonetizationOnIcon />,
    },
    {
      label: "ประเภท",
      detail: props.product.Category,
      imageIcon: <CategoryIcon />,
    },
    {
      label: "จำนวนคงเหลือ",
      detail: props.product.Stock,
      imageIcon: <AccountBalanceIcon />,
    },
    {
      label: "จำนวนสั่งซื้อ",
      detail: props.product.Order,
      imageIcon: <ShoppingCartIcon />,
    },
    {
      label: "ขายได้ทั้งหมด",
      detail: props.product.Sold,
      imageIcon: <ShopIcon />,
    },
  ];

  const classes = useStyles();

  return (
    <div className={classes.container}>
      {product_detail.map((data, index) => {
        return (
          <FolderList key={index}
            imageIcon={data.imageIcon}
            label={data.label}
            detail={data.detail}
          />
        );
      })}
    </div>
  );
}
