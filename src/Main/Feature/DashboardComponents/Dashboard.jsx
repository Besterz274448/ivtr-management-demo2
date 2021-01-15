import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";
import DataBox from "./DataBox";
import DataTable from "./DataTable";
import DashboardHeader from "./DashboardHeader";
import BestSellBoard from "./BestSellBoard";

class DashBoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overall_data: [],
    };
  }
  
  fetchOrder = () => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.responseText);
        this.setState({
          overall_data: [...data],
        });
      }
    };
    xhr.open("GET", "/productdetail_mockups/dashboard_data.json");
    xhr.send();
  };

  componentDidMount() {
    this.fetchOrder();
  }

  render() {
    return (
      <>
        <Paper>
          <Grid container>
            <Grid item xs={12}>
              <DashboardHeader />
            </Grid>
          </Grid>
          <Divider></Divider>
          <Grid container style={{ padding: "3% 1%" }}>
            <Grid item xs={3}>
              <Paper style={{ width: "95%" }}>
                <DataBox
                  label={"ยอดขายวันนี้"}
                  type="Today"
                  total={"32"}
                  profit={26}
                  sinceDate={"จากสัปดาห์ก่อน"}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper style={{ width: "95%" }}>
                <DataBox
                  label={"ยอดขายทั้งหมด"}
                  type="Year"
                  total={"524"}
                  profit={15}
                  sinceDate={"จากสัปดาห์ก่อน"}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper style={{ width: "95%" }}>
                <DataBox
                  label={"จำนวนเงินที่ได้รับ"}
                  type="Today"
                  total={"$ 150364 บาท"}
                  profit={15}
                  sinceDate={"จากสัปดาห์ก่อน"}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper style={{ width: "95%" }}>
                <DataBox
                  label={"จำนวนสั่งซื้อทั้งหมด"}
                  type="Year"
                  total={"610"}
                  profit={-14}
                  sinceDate={"จากสัปดาห์ก่อน"}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container style={{ padding: "0% 1%" }}>
            <Grid item xs={8}>
                <DataTable data={this.state.overall_data}/>
            </Grid>
            <Grid item xs={4}>
                <BestSellBoard/>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

export default DashBoardContainer;
