import React, { Component } from "react";
import styles from "./GoogleSignin.module.scss";
import Button from "components/Button";
import Loader from "components/Loader";

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
  }
  onGoogleSiginIn = (googleUser) => {
    if (!this.state.isAuthenticated) {
      window.flash("Logged in Successfully!");
    }
    this.setState({
      isAuthenticated: true,
      username: googleUser.getBasicProfile().getName(),
      authToken: googleUser.getAuthResponse().id_token,
      isLoading: false,
    });
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
                        onClick={this.onGoogleSignOut}
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
