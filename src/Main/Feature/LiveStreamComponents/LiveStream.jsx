import React from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import MainLive from ".//MainLive/MainLive";
import ProductLive from ".//ProductLive/ProductLive";
import FacebookLogin from "react-facebook-login";

class LiveStream extends React.Component {
  state = {
    access_token: "",
    userProfile: {},
    pages: {},
  };

  async componentDidMount() {
    const fbgrant = localStorage.getItem("fbgrant");
    if (fbgrant) {
      const accessToken = { params: { access_token: fbgrant } };
      const userProfile = await axios.get(
        "https://graph.facebook.com/v9.0/me",
        accessToken
      );
      const pages = await axios.get(
        `https://graph.facebook.com/v9.0/${userProfile.data.id}/accounts?`,
        accessToken
      );

      this.setState({
        access_token: fbgrant,
        userProfile: userProfile,
        pages: pages.data.data,
      });
    }
  }

  loginFacebook = (response) => {
    localStorage.setItem("fbgrant", response.accessToken);
    this.setState({ access_token: response.accessToken });
  };

  render() {
    if (this.state.access_token) {
      return (
        <Switch>
          <Route path="/livestream" exact component={MainLive} />
          <Route path="/livestream/product" exact component={ProductLive} />
        </Switch>
      );
    } else {
      return (
        <FacebookLogin
          appId="1973535806121066"
          autoLoad={false}
          fields="name,email,picture"
          scope="pages_show_list,read_page_mailboxes,pages_messaging,pages_read_engagement,pages_manage_metadata,pages_read_user_content,pages_manage_ads,public_profile"
          callback={this.loginFacebook}
          icon="fa-facebook"
          size="small"
        />
      );
    }
  }
}

export default LiveStream;
