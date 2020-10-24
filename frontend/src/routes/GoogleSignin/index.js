import React, { Component } from "react";
import styles from "./GoogleSignin.module.scss";
import Button from "components/Button";
import Loader from "components/Loader";

import AuthService from "handlers/AuthService";
import { getExchangeToken } from "api/methods/index";
class GoogleSignin extends Component {
  constructor() {
    super();
    this.clientID = process.env.REACT_APP_GAPI_CLIENT_ID;
    this.state = {
      isAuthenticated: false,
      isLoading: true,
      username: "",
      authToken: null,
    };
    this.Auth = new AuthService();
  }
  onGoogleSiginIn = (googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token;
    const username = googleUser.getBasicProfile().getName();
    if (!this.Auth.hasAccessToken()) {
      this.setState({ isLoading: true });
      getExchangeToken(id_token)
        .then((res) => {
          const user = {
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            user_id: res.data.user,
            username: username,
          };
          this.Auth.setUser(user);
          const msg = res.data.msg;
          this.setState({
            isAuthenticated: true,
            username: username,
            authToken: id_token,
            isLoading: false,
          });
          window.flash(msg);
        })
        .catch((err) => {
          this.setState({
            isAuthenticated: false,
            username: "",
            isLoading: false,
          });

          window.gapi.auth2
            .getAuthInstance()
            .signOut()
            .then(() => {
              window.flash(
                err.data !== undefined && err.data.msg !== undefined
                  ? err.data.msg
                  : "There was some issue logging in. \n Please Try Again Later!",
                "error"
              );
            });
        });
    } else {
      this.setState({
        isAuthenticated: true,
        username: username,
        isLoading: false,
      });
    }
  };
  onUserSignOut = () => {
    this.Auth.logout();
    this.onGoogleSignOut();
  };
  onGoogleSignOut = () => {
    this.setState({ isLoading: true });
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        this.setState(
          {
            isAuthenticated: false,
            isLoading: false,
          },
          () => {
            this.renderBtn("g-signin2");
            window.flash("Signed Out Successfully");
          }
        );
      });
  };
  onGoogleFailure = () => {
    window.flash(
      "We were unable connect to your google account. Please try again!",
      "warning"
    );
  };
  renderBtn = (id) => {
    window.gapi.signin2.render(id, {
      scope: "email",
      width: 200,
      height: 50,
      theme: "dark",
      onsuccess: this.onGoogleSiginIn,
      onfailure: this.onGoogleFailure,
    });
  };
  onGapiLoaded = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: this.clientID,
          cookiepolicy: "single_host_origin",
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });
          window.gapi.load("signin2", () => {
            this.renderBtn("g-signin2");
          });
        });
    });
  };
  loadGapi = () => {
    const script = document.createElement("script");
    script.onload = this.onGapiLoaded;
    script.src = "https://apis.google.com/js/api:client.js";
    document.body.appendChild(script);
  };
  componentDidMount() {
    this.loadGapi();
  }
  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className={styles.head}>
            <div className={styles.loginParent}>
              {this.state.isAuthenticated ? (
                <div className={styles.greetingText}>
                  Welcome {this.state.username}
                </div>
              ) : (
                <div className={styles.greetingText}>
                  Welcome to <span className={"color-red"}>SMP</span>
                  <br /> Please Login
                </div>
              )}
              <div className={styles.loginBtnParent}>
                {this.state.isAuthenticated ? (
                  <>
                    <div className={styles.regBtnParent}>
                      <Button
                        text="Sign Out"
                        onClick={this.onUserSignOut}
                        className={styles.gSigninBtn}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.gSigninBtn}>
                      <div id="g-signin2" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default GoogleSignin;
