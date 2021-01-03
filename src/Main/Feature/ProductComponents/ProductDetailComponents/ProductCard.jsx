import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import "./css/ProductCard.css";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4px",
    height: "400px",
    overflowY: "scroll",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
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

function BoxMediaCard(props) {
  const classes = useStyles();

  return (
    <div className="slideshow-container">
      <CardMedia
        className={classes.media + " mediaSlide"}
        image={props.productImage[props.imageNumber]}
        title="PhotoImage"
      />

      {props.productImage.length > 1 ? (
        <React.Fragment>
          <p
            className="prev"
            onClick={() => {
              let prev = props.imageNumber;
              props.handleImage(--prev);
            }}
          >
            &#10094;
          </p>
          <p
            className="next"
            onClick={() => {
              let next = props.imageNumber;
              props.handleImage(++next);
            }}
          >
            &#10095;
          </p>
        </React.Fragment>
      ) : (
        false
      )}
    </div>
  );
}

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card id="productCard" className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     H
        //   </Avatar>
        // }
        title={
          <Tooltip title={props.product.Name}>
            <Typography>
              <span>ชื่อ : </span>
              {props.product.Name.length > 25
                ? props.product.Name.slice(0, 24) + ".."
                : props.product.Name}
            </Typography>
          </Tooltip>
        }
        subheader={"อัพเดทล่าสุด : " + props.product.ModifiedOn}
      />
      <BoxMediaCard
        productImage={
          props.product.Picture.length < 1
            ? [
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///9NTU0+Pj5GRkY6Ojrv7+/V1dXQ0NCPj49YWFiSkpJOTk739/dKSkr8/Pw9PT1hYWHBwcFdXV01NTVWVlZlZWXf39+hoaF8fHzl5eXa2tpycnIqKiqDg4NoaGjr6+u0tLSurq6enp6GhobJycm7u7seHh6wsLBnympdAAAJq0lEQVR4nO2di3aiOhRAAwEU8wBJEBF8Ie38/x/eExBEbKvtoNC5Z8+qVQoh25wkEAJDCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIg/2P4aT42J/5UQ1fRsVHucw0da2wcNBzEkI3ixl5nSO1xoK8ypAdvHA70RYaB99R9fI4XoOHfUxnaoxnaaPj3oOFzQcMhQMPngoZDgIbPBQ2HAA2fy+QM5dB7n5QhT9PhR/0mYmhK7hA7gRPEh4FLcSKGhKx8W5hRI2H7q0FDdSqGni3OY2NMDDscMBFDV4jLAKCgQ+ZnIoZz2h3jpPMB9z4NQ94bFQ8GzNA0DEv72tAuh9v7NAwTem1Ik+H2Pg3Dom9YDLf3aRge+4bH+6k+2mdOw3AW9Fqa2b00pXzUcRqGpNfS0Acyn6we2/tEDK/ClNkPNDSpE/6qMpRh55iGRg9EYCzsxUN7n4ghcXVbilTfzY6E/oVZ6m5tNUzEUBK+VVQA1Nny+yW4MkkK9sjZ5EQMDatip/WuuN+AgH9UBTVdP9CeTsiQ1H3A/UxLUpzb3uDtfprTMnyQTXugbqd3V/6NhtJvG16xu7v2bzRcXDpPZt89gv2Fhp7qTj5y7qX7+wy5Ft3ZVULf6TJ+n+H1gIfF6Onr1vfXGc56Ax7MCpZfbjCu4cOnQC3cElYfuv8qlZHLcP/dPfdi9IEuY0xDOBjV2XcSkqR0PpjD+fXZ1qiGMqQPngKd4eI2Rg325vNtRjXcQcg5DxxatmzpuStk5jSk22V8vs1ohtA2ZFWdCr74/nssL+3oLsvi7knz56PkI5bh1q4ae2E9es2Q09YpixgLd+1HZjmfjiGPZ3hqRp9E/GA666YdFWHsZ1kU68vhm7ma83GXMZrhwm5yJ+zHLsQsg3aLnc4EvITdLuOzVnkswyJo4ktrKzg+0PG7rSATcRRHYRxF3fY0+GQUeSTD46XNCEOL3T1BANadhkVnmuldeH2Dg/3x+McYhpIc1CVvYQStjdjfS+QAhS4s4ce+CUmohrt+3y+iDzccwVCSt6YEBWNgCG9oNbzLOa+iVcIbcn4jZbXQtau1RShiplklWwe5MGlUaVn0w6OHMcqwbEM0jEJtypCFel55VWr1b9m8qRZmgunYD3XE/MiPQqEhuC0d+mEIaVQjb/BGfzSAOoLh7NJNCB0zKEMWi0gfG0PJe2/A9mDD2hT6h8jyowgMIwa10Pxi8OP7VVqR8D/oWl9vuGlmXVgaigP6tgia01ALp6yN2pK7CPIUcsn8EGIygiiFQzYLDKuIDa0Y/kGZQlo7Ea0nYLhqBatcmkit3wh/VQdn89LBtKPwNcBrBF5W7IvaEMxgqa+rMgVhHRxu+p1XG+47B8wml4zVIQeGUew2te/akBwZY61hXFk1hv7FEGJYWPZNo/xiw6t5M9C+hH4MWTaVCsKVnnrBef60gvbF8iEaYVufmU3OhlZoNWVo0mLa1G23V4ivNeR+VxCaF0tDXaoNob1xCtlURPdiKMMIVtDCNz2htRNahPpcDy+GFlRSqItQvv0B1JcaXglWitDYa+NWHX9BKZjWpmlDZd0bysSOYwHdQn01hsXVJtB1QEOszaYCFpkgh7R8MBbedVV8qeFb72I2BNU5apvXYFV3+bK+UG8+rOx6xc4mjJ23EKz6AxPnNIR1e83tpYbLG8NzYba/+uO74HguOtZbuXrz4Y23dDs9w272+idBxf1t+lwPoE7N0Opdatk49ze5TaPrMznDq6uekvgfD659zdUA6vQMr87zFvRH97h3B1AnaChEmx3vh88qYGrT9hgTNLy0NlL/JEYNwp+04Xn0U3Yv9n4Xepq0oeUczHb9C2nfoh1AnaZhdfe+ZD+N0YpmOvxEDRnk76MLad9AZPXx6TQN4Sx+V/5NjBrsP2S6hpYZpv9LQQj11aQNB6AeQP2XDRldQFX8pw2r6UT/siHsdImGaIiGN4bitbzcsLT812KVo8/6egGvM3x82sywbF5lKLaLcdiKFxnCofQ4VCeZ+OxLNETDfKQHe17In2vIy9nYlE99UrIc/JEzP2ASmUAQBEH+58hqRqzk/SMLPkRH3M6yrXdFmmm4nYXPx1WOuYagg+td8pwNkLhWLtFO811Jrs6JrvJv3VT1d3BHxGZixfmJHs0BBo8y0nlMiZkJ1eSzedu5f09e/br8PQtd4ge8WcqD8y1CK7W+3uKZcIeZaTy14X7W3mLuciL3nGyggFOvyuPKq+d9pZ7ke14taCOZe94etnHNlDAXAp5vPHPnoYl934a1XM8zSwOfrMxEhdrQ9e7f0D6Mobn5xxjytcrzXV0h+bsg3vvJz9WieFd0T3iY57mZtw8r0fn7krhRnjf3fpVBnqsTSd4TAltlZAkJqQUhLOeV4dF8Tgi3/fW70mltmMDC7AWFyFW2CBaV4dZZl6dgd17sk01gH2eChptTUJAiL1YLpyAHFW7+BHZJsiDxQlWXAg3KTaRSN4gImatSBnTmmToY2ZWhq7Q3o4HkNt1u5vauMizVbpOob90B+ENDZydtlUZUuoFpB3Zq0xo6UBczxyMzZw4xRfjRWVSf4bsoXRVD2an6bhjJyT5zNlC+G0mZaStJunPSxhAWyBTqIw8ElBl1eAqGW1if+NZLDMnByUIKQuZpHQtn2RqqrTFMyUzNCS+sXNAFiYK9CbByFVjmP4kxM0ck2awdZe7lK1UxUwUhs8xRLLgYljsFf+emHhISO6kxDIWw6bPPfxtDElKLytSUCtnWj5a5MVyrZO9BUO1M5zJ3yhSCbOaZhqjqBUo5N2UiohMEbqr0TK6d/dlQbvLYAzEwNFGiHdcYZsEStveeXxErQ88xz3/S0KjOKOXXhqo2tKBbS6DCJsHaLW2oh+Z2oSSrvo6NaThiY5hQM2uqhKKVOmgN36BcObU5t+0DmYGmqYeJk5B9/IJ66OamO9wG0OOXSglHlVUnZXr8TQ4Zz3IwzE/k5PiZba8JZ45SWVBCk0Njp57nxh07YxS2hNJTb+YoIsiEUB7xFYdeH6qdnVFLpfC12dpWS+jxISGhQpHf3qIwOLw4GM8kgT2lxXpxnn3IkyPZF5DbQ+LC8iWRybrgR7PW29FNjM1svk7OHWI63y73iZnq9KdatJpvy1UxI0f4ZH6803a2STyZvO3nWyj2ffJmdrGeP/Swpb/jcjRyNVwim5f2p3lTxIkJ3U8eN3T7nILuku4xz3QHZzzlCFs9cFg5XYV7rJL54u33Zh9BEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBkInxH6sIwg7VzdHaAAAAAElFTkSuQmCC",
              ]
            : props.product.Picture
        }
        imageNumber={props.imageNumber}
        handleImage={props.onChangeImage}
      />
      <CardContent>
        <b>รายละเอียด</b> : {props.product.Description}
      </CardContent>
    </Card>
  );
}
