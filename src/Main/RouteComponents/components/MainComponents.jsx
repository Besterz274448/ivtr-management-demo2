import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Product from '../../Feature/ProductComponents/ProductContainer';
import LiveStream from "../../Feature/LiveStreamComponents/LiveStream";
import Order from '../../Feature/OrderComponents/Order';
import Dashboard from '../../Feature/DashboardComponents/Dashboard'
import Report from '../../Feature/ReportComponents/Report';
import Promotion from "../../Feature/PromotionComponents/Promotion";
import Campaign from "../../Feature/CampaignComponents/Campaign";
import Contact from "../../Feature/ContactComponents/Contact";
import Setting from "../../Feature/SettingComponents/Setting";
import {Switch, Route } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MainComponents({selected}){
      const classes = useStyles();
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/product" component={Product} />
            <Route path="/order" exact component={Order} />
            <Route path="/livestream" exact component={LiveStream} />
            <Route path="/promotion" exact component={Promotion} />
            <Route path="/campaign" component={Campaign} />
            <Route path="/report" exact component={Report} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/setting" exact component={Setting} />
          </Switch>
        </div>
      </main>
    );
}