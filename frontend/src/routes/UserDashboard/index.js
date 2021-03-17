import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import styles from "./UserDashboard.module.scss";
import AuthService from "handlers/AuthService";
import Button from "components/Button";
import {
  checkMentorHasApplied,
  checkMentorIsSelected,
  withdrawApplication,
} from "api/methods";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      isAuthenticated: this.Auth.hasAccessToken(),
      username: "",
      hasApplied: false,
      isAccepted: false,
      isServerError: true,
    };
  }
  onUserSignOut = () => {
    this.Auth.logout();
    this.setState({
      isAuthenticated: false,
      username: "",
    });
  };
  onClickWithdraw = () => {
    const r = window.confirm(
      "Are you sure and want to withraw your application!"
    );
    if (r === true) {
      withdrawApplication()
        .then((res) => {
          this.setState({
            hasApplied: false,
            isAccepted: false,
          });
        })
        .catch((error) => {
          if (error && error.logout === true) {
            window.flash(error.msg, "error");
            this.setState({
              isAuthenticated: false,
            });
          } else {
            window.flash("Unable to connect to server");
          }
        });
    }
  };
  componentDidMount() {
    this.setState({
      username: this.Auth.getUsername(),
    });
    const checkPrivileges = async (userID) => {
      await checkMentorHasApplied(userID)
        .then((res) => {
          this.setState({
            hasApplied: res.data.status,
          });
        })
        .catch((err) => {
          window.flash("Unable to connect to server", "error");
          this.setState({
            redirect: true,
            isLoading: false,
            isServerError: true,
          });
        });
      await checkMentorIsSelected(userID)
        .then((res) => {
          this.setState({
            isAccepted: res.data.status,
            isServerError: false,
          });
        })
        .catch((err) => {
          window.flash("Unable to connect to server", "error");
          this.setState({
            redirect: true,
            isLoading: false,
            isServerError: true,
          });
        });
    };
    checkPrivileges(this.Auth.getUserId());
  }
  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/g-signin" />;
    }
    return (
      <>
        <div className={styles.head}>
          <div className={styles.dashboardParent}>
            <div className={styles.greetingText}>
              {"Welcome "}
              <span className={"color-red"}>{this.state.username}</span>
            </div>
            <div className={styles.userOptions}>
              <Button
                text="Sign Out"
                onClick={this.onUserSignOut}
                className={styles.commonBtn}
              />
              <br />
              {!this.state.isServerError ? (
                <>
                  {this.state.hasApplied ? (
                    <>
                      {this.state.isAccepted ? (
                        <Link to="/datacollection/mentors/register">
                          <Button
                            className={styles.commonBtn}
                            text="Create / Update your profile"
                          />
                        </Link>
                      ) : (
                        <Button
                          onClick={this.onClickWithdraw}
                          className={styles.commonBtn}
                          text="With Draw Application"
                        />
                      )}
                    </>
                  ) : (
                    <Link to="/datacollection/mentors/apply">
                      <Button
                        className={styles.commonBtn}
                        text="Apply to become a mentor"
                      />
                    </Link>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserDashboard;
